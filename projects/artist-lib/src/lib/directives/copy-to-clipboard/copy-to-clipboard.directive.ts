import { Directive, ElementRef, HostListener } from '@angular/core';
import { OutsidePlacement, RelativePosition, Toppy, ToppyControl } from 'toppy';
import { ColorEngine } from '../../services/engine.service';
import { delay } from '../../utilities/helpers';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[artist-copy-to-clipboard]'
})
export class CopyToClipboardDirective {
  overlayIns: ToppyControl;
  @HostListener('click', ['$event'])
  async onClick() {
    try {
      await (navigator as any).clipboard.writeText(this._engine.getColorCss('hex'));
      this.overlayIns.open();
      await delay(500);
      this.overlayIns.close();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  constructor(private _engine: ColorEngine, private _toppy: Toppy, private _elRef: ElementRef) {}

  ngOnInit() {
    const position = new RelativePosition({
      placement: OutsidePlacement.TOP,
      src: this._elRef.nativeElement
    });

    this.overlayIns = this._toppy
      .position(position)
      .content('copied!')
      .create();
  }
}
