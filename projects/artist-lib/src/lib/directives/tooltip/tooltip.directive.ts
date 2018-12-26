import { Directive, ElementRef, HostListener, Input, NgZone, OnInit } from '@angular/core';
import { OutsidePlacement, RelativePosition, Toppy, ToppyControl } from 'toppy';

@Directive({
  selector: '[artist-tooltip]'
})
export class TooltipDirective implements OnInit {
  @Input('artist-tooltip') tooltip: string;
  private toppyControl: ToppyControl;

  constructor(private toppy: Toppy, private elRef: ElementRef, private _zone: NgZone) {}

  ngOnInit() {
    this.toppyControl = this.toppy
      .position(new RelativePosition({ src: this.elRef.nativeElement, placement: OutsidePlacement.TOP, width: 'auto' }))
      .config({})
      .content(this.tooltip, { class: 'ArtTooltip' })
      .create();
  }

  @HostListener('mouseenter', ['$event'])
  onMouseenter() {
    this.toppyControl.open();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseleave() {
    this.toppyControl.close();
  }
}
