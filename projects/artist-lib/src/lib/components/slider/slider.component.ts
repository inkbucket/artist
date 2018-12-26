import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ColorEngine } from 'artist/lib/services/engine.service';
import { generateID } from 'artist/lib/utilities/helpers';
import { Subject } from 'rxjs';
import { RelativePosition, Toppy, ToppyControl } from 'toppy';

@Component({
  selector: 'artist-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'ArtSlider';
  @Input() min = 0;
  @Input() max = 100;
  @Input() bgClass = '';
  @Input() channel: string;
  @Input() channelIndex: number;
  @Input() range = 1;
  @Input() name = '';
  @Input() label = '';
  @Output() valueChange = new Subject();
  position = { x: 0, y: 0, triggerChange: false };
  id = generateID();
  private _sliderEl;
  private _sliderHandleEl;
  private _val;
  private _x;
  private _y;
  private _toppyControl: ToppyControl;
  constructor(private _elRef: ElementRef, private _engine: ColorEngine, private _toppy: Toppy) {}

  ngOnInit() {
    this._sliderEl = this._elRef.nativeElement.querySelector('.ArtSlider__Bar');
    this._sliderHandleEl = this._elRef.nativeElement.querySelector('.ArtSlider__Handle');

    this._toppyControl = this._toppy
      .position(
        new RelativePosition({
          src: this._sliderHandleEl,
          autoUpdate: true
        })
      )
      .config({})
      .content('', { class: 'ArtTooltip' })
      .create();
  }

  // ngAfterViewInit() {
  // this._engine
  //   .onColorChange()
  //   .pipe(skipCurrent(this.name))
  //   .subscribe((color: any) => {
  //     const val = this._engine.getColorChannel(this.channel);
  //     let x = 0;
  //     if (val) {
  //       this._val = val;
  //       x = Number((this._sliderEl.offsetWidth * (val / this.max)).toFixed(2));
  //     }
  //     if (x !== 0 && this._x !== x) {
  //       this._x = x;
  //       this.position = { x, y: 0, triggerChange: false };
  //     }
  //     const hex = this._engine.getColor('hex');
  //     const newEngine = this._engine.clone(hex);
  //     const newEngine2 = this._engine.clone(hex);
  //     const start = newEngine.setColorChannel(this.channel, this.min);
  //     const end = newEngine2.setColorChannel(this.channel, this.max);
  //     this._sliderEl.style.background = `linear-gradient(to right,
  //       ${newEngine.getColor('hex')},
  //       ${newEngine2.getColor('hex')})`;
  //   });
  // }

  setValue(val) {
    this._val = val * this.range;
    const x = this._sliderEl.offsetWidth * (this._val / this.max);
    this.position = { x, y: 0, triggerChange: false };
  }

  ngAfterViewInit() {
    this.position = { ...this.position };
  }

  onHandleChange({ x, y }) {
    this._x = x;
    this._y = y;
    const val = (x / this._sliderEl.offsetWidth) * this.max;
    this._val = val / this.range;
    this._val = Number(this._val.toFixed(2));
    this.valueChange.next({ index: this.channelIndex, value: this._val, from: this.id });
    this._toppyControl.updateContent(String(this._val));
  }

  onMouseEnter() {
    this._toppyControl.open();
  }
  onMouseLeave() {
    this._toppyControl.close();
  }

  setCurrentValue(value) {
    const hex = value.getColor('hex');
    const newEngine = this._engine.clone(hex);
    const newEngine2 = this._engine.clone(hex);
    const start = newEngine.setColorChannel(this.channel, this.min);
    const end = newEngine2.setColorChannel(this.channel, this.max);
    this._sliderEl.style.background = `linear-gradient(to right,
          ${newEngine.getColor('hex')},
          ${newEngine2.getColor('hex')})`;
  }

  getValueChange() {
    return this.valueChange.asObservable();
  }

  inc() {
    const incValue = this._val + 1;
    if (incValue <= this.max) {
      this._val = incValue;
      this.setValue(incValue / this.range);
      this.valueChange.next({ index: this.channelIndex, value: incValue / this.range, from: this.id });
    }
  }

  dec() {
    this._engine.setColorChannel(this.channel, '-1', 'ANY');
  }

  getValue() {
    return Math.fround(this._val);
  }
}
