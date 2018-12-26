import { Component, ElementRef, ViewChild } from '@angular/core';
import { OutsidePlacement, RelativePosition, Toppy, ToppyControl } from 'toppy';
import { ArtistComponent } from '../../projects/artist-lib/src/lib/artist.component';

@Component({
  selector: 'artist-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('el', { read: ElementRef }) el: ElementRef;
  private toppyControl: ToppyControl;

  constructor(private toppy: Toppy) {}

  ngOnInit() {
    this.toppyControl = this.toppy
      .position(
        new RelativePosition({
          src: this.el.nativeElement,
          placement: OutsidePlacement.BOTTOM,
          autoUpdate: true
        })
      )
      .config({
        closeOnDocClick: false
      })
      .content(ArtistComponent)
      .create();

    this.toppyControl.listen('t_open').subscribe(a => {
      console.log('now');
    });
  }

  openPicker() {
    this.toppyControl.open();
  }
}
