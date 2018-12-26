import { AfterViewInit, Directive, HostBinding } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { ColorEngine } from '../../services/engine.service';

@Directive({
  selector: '[artist-preview]'
})
export class PreviewDirective implements AfterViewInit {
  @HostBinding('style.backgroundColor') bgColor = '';

  constructor(private _engine: ColorEngine) {}

  ngAfterViewInit() {
    this._engine
      .onColorChange()
      .pipe(startWith(''))
      .subscribe(_ => {
        this.bgColor = this._engine.getColor('hex');
      });
  }
}
