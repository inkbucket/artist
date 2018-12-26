import { Directive, ElementRef, HostListener, NgZone } from '@angular/core';
import { OutsidePlacement, RelativePosition, Toppy, ToppyControl } from 'toppy';
import { ArtistComponent } from '../../artist.component';

@Directive({
  selector: '[artist-picker]'
})
export class PickerDirective {
  private toppyControl: ToppyControl;

  constructor(private toppy: Toppy, private elRef: ElementRef, private _zone: NgZone) {
    this.toppyControl = this.toppy
      .position(new RelativePosition({ src: this.elRef.nativeElement, placement: OutsidePlacement.BOTTOM }))
      .config({
        closeOnDocClick: false
      })
      .content(ArtistComponent)
      .create();
  }

  @HostListener('mouseenter', ['$event'])
  onclick() {
    console.log('clicked');
    this.openPicker();
  }

  openPicker() {
    this.toppyControl.open();
  }
}
