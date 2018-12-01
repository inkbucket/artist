import { Directive, ElementRef, HostListener } from '@angular/core';
import { ColorEngine } from '../../services/engine.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[artist-copy-to-clipboard]'
})
export class CopyToClipboardDirective {
  @HostListener('click', ['$event'])
  async onClick() {
    try {
      await (navigator as any).clipboard.writeText(this._engine.getColorCss('hex'));
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  constructor(private _engine: ColorEngine, private _elRef: ElementRef) {}
}
