import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { skipCurrent } from 'artist/lib/operators/skip-current.operator';
import { ColorEngine } from 'artist/lib/services/engine.service';

@Component({
  selector: 'artist-palette-bar',
  templateUrl: './palette-bar.component.html'
})
export class PaletteBarComponent implements OnInit, AfterViewInit {
  private _paletteEl;
  private _paletteHandleEl;
  private _hue = 0;
  position = { x: 0, y: 0, triggerChange: false };

  @HostBinding('class') className = 'ArtPaletteSlider';
  constructor(private _elRef: ElementRef, private _engine: ColorEngine) {}

  ngAfterViewInit() {
    this._paletteEl = this._elRef.nativeElement.querySelector('.ArtPaletteSlider__Bar');
    this._paletteHandleEl = this._elRef.nativeElement.querySelector('.ArtPaletteSlider__Handle');
    this._hue = this._engine.getColorChannel('hsv.h').toFixed(2);
    this._engine
      .onColorChange()
      .pipe(skipCurrent('PALETTE'))
      .subscribe((color: any) => {
        const [hue, sat, val] = this._engine.getColorChannel('hsv').map(c => (isNaN(c) ? 0 : c));
        console.log('x', hue, sat, val);
        const alpha = this._engine.getColorChannel('alpha');
        const x = sat * this._paletteEl.offsetWidth;
        const y = this._paletteEl.offsetHeight - val * this._paletteEl.offsetHeight;
        this.position = { x, y, triggerChange: false };
        this._hue = hue;
        this.changePaletteBg(hue, alpha);
      });
    this._engine.triggerColorChange('PALETTEE');
  }

  ngOnInit() {}

  onHandleChange({ x, y }) {
    const s = (((x / this._paletteEl.offsetWidth) * 100) / 100).toFixed(2);
    const v = ((100 - (y / this._paletteEl.offsetHeight) * 100) / 100).toFixed(2);
    const alpha = this._engine.getColorChannel('alpha');

    // if (s < 1 || v < 1) {
    //   h = 100;
    // }

    this._engine.setColor(this._hue, s, v, 'hsv', 'PALETTE');
    this.changePaletteBg(this._hue, alpha);
  }

  changePaletteBg(hue, alpha) {
    this._paletteEl.style.background = `
    linear-gradient(to top, rgba(0, 0, 0, ${alpha}), transparent),
    linear-gradient(to left, hsla(${hue}, 100%, 50%, ${alpha}), rgba(255, 255, 255, ${alpha}))
`;
  }
}
