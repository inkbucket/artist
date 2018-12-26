import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2 } from '@angular/core';
import { off, on } from '../../utilities/helpers';

@Directive({
  selector: '[artist-cursor]',
  exportAs: 'cursor'
})
export class CursorDirective implements AfterViewInit, OnChanges {
  @Input()
  lockX = false;
  @Input()
  lockY = false;
  @Input()
  position = { x: 0, y: 0 };
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  private _handleEl;
  private _sliderEl;
  private _wrapperRect;
  private _cache;
  constructor(private _elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this._handleEl = this._elRef.nativeElement.querySelector('.ArtSlider__Handle');
    this._sliderEl = this._elRef.nativeElement.querySelector('.ArtSlider__Bar');
    this._wrapperRect = this._sliderEl.getBoundingClientRect();

    on([this._sliderEl, this._handleEl], 'mousedown', this._tapstart);
    on([this._sliderEl, this._handleEl], 'touchstart', this._tapstart, {
      passive: false
    });
    this.update(this.position);
  }

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log(changes);
    this.update(changes.position.currentValue);
  }

  trigger() {
    this._wrapperRect = this._sliderEl.getBoundingClientRect();
    this._tapmove();
  }

  update(position) {
    if (!this._sliderEl) {
      return;
    }
    const { x = 0, y = 0, triggerChange = true } = position;
    this._wrapperRect = this._sliderEl.getBoundingClientRect();
    this._tapmove({
      clientX: this._wrapperRect.left + x,
      clientY: this._wrapperRect.top + y,
      triggerChange
    });
  }

  destroy() {
    off([this._sliderEl, this._handleEl], 'mousedown', this._tapstart);
    off([this._sliderEl, this._handleEl], 'touchstart', this._tapstart, {
      passive: false
    });
  }

  private _tapstart = evt => {
    on(document, ['mouseup', 'touchend', 'touchcancel'], this._tapstop);
    on(document, ['mousemove', 'touchmove'], this._tapmove);

    evt.preventDefault();
    this._wrapperRect = this._sliderEl.getBoundingClientRect();

    // Trigger
    this._tapmove(evt);
  };
  private _tapmove = (evt = null) => {
    const b = this._wrapperRect;

    let x = 0,
      y = 0,
      triggerChange = true;
    if (evt) {
      const touch = evt && evt.touches && evt.touches[0];
      x = evt ? (touch || evt).clientX : 0;
      y = evt ? (touch || evt).clientY : 0;
      triggerChange = evt.triggerChange;
      if (typeof triggerChange === 'undefined') {
        triggerChange = true;
      }

      // Reset to bounds
      if (x < b.left) {
        x = b.left;
      } else if (x > b.left + b.width) {
        x = b.left + b.width;
      }
      if (y < b.top) {
        y = b.top;
      } else if (y > b.top + b.height) {
        y = b.top + b.height;
      }

      // Normalize
      x -= b.left;
      y -= b.top;
    } else if (this._cache) {
      x = this._cache.x;
      y = this._cache.y;
    }

    if (!this.lockX) {
      this._handleEl.style.left = x - this._handleEl.offsetWidth / 2 + 'px';
    }

    if (!this.lockY) {
      this._handleEl.style.top = y - this._handleEl.offsetHeight / 2 + 'px';
    }

    this._cache = { x, y };
    if (triggerChange) {
      this.change.emit({ x, y });
    }
  };

  private _tapstop = () => {
    off(document, ['mouseup', 'touchend', 'touchcancel'], this._tapstop);
    off(document, ['mousemove', 'touchmove'], this._tapmove);
  };
}
