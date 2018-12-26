import { Component, OnInit } from '@angular/core';
import { ColorEngine } from 'artist/lib/services/engine.service';
import { ArtistBaseScreen } from '../screen.abstract';

@Component({
  selector: 'artist-palette-screen',
  templateUrl: './palette.component.html'
})
export class PaletteScreen extends ArtistBaseScreen implements OnInit {
  static meta = {
    label: 'Palette',
    showInMenu: true
  };
  constructor(private _engine: ColorEngine) {
    super();
  }
  ngOnInit() {}
}
