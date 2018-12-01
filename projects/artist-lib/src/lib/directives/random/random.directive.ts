import { Directive, HostListener } from '@angular/core';
import { ColorEngine } from '../../services/engine.service';

@Directive({
  selector: '[artist-random]'
})
export class RandomDirective {
  @HostListener('click', ['$event'])
  onClick() {
    this._engine.setColor(this._engine.getRandom(), 'hex');
  }
  constructor(private _engine: ColorEngine) {}
}
