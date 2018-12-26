import { Injectable } from '@angular/core';
import chroma from 'chroma-js';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorEngine {
  private _currentColor;
  private _colorChanged = new Subject();

  constructor() {
    this.setColor('#2f8cab', 'hex');
  }

  setColor(...colorComponents) {
    const emitFrom = colorComponents.splice(-1, 1)[0];
    this._currentColor = chroma(...colorComponents);
    this.triggerColorChange(emitFrom);
  }

  setColorChannel(channel, data, emitFrom = '') {
    this._currentColor = this._currentColor.set(channel, data);
    this.triggerColorChange(emitFrom);
  }

  getColor(type) {
    return this._currentColor[type]();
  }

  getColorChannel(data) {
    return this._currentColor.get(data);
  }

  getColorName() {
    return this._currentColor.name();
  }

  getColorCss(type = null) {
    switch (type) {
      case 'rgb':
      case 'hsl':
        return this._currentColor.css(type);
      case 'hex':
        return this.getColor(type);
      case 'hsv':
        const [h, s, v] = this.getColor(type).map(x => Number(x.toFixed(2)));
        return `hsv(${h},${s},${v})`;
      case 'cmyk':
        const [c, m, y, k] = this.getColor(type).map(x => Number(x.toFixed(2)));
        return `cmyk(${c},${m},${y},${k})`;

      default:
        break;
    }
    return this._currentColor.css(type);
  }

  getScaleColors(count) {
    const color = this._currentColor.hex();
    return chroma.scale([chroma(color).set('hsl.h', '-30'), chroma(color).set('hsl.h', '+30')]).colors(count);
  }

  getRangeScale(count = 1) {
    count = count + 2;
    return chroma
      .scale(['black', this.getColor('hex'), 'white'])
      .mode('lch')
      .colors(count)
      .slice(1, -1);
  }

  getRandom() {
    return chroma.random();
  }

  onColorChange() {
    return this._colorChanged.asObservable();
  }

  triggerColorChange(emitFrom) {
    this._colorChanged.next({ color: this, emitFrom });
  }

  clone(color) {
    const cl = new ColorEngine();
    cl.setColor(color, 'hex');
    return cl;
  }
}
