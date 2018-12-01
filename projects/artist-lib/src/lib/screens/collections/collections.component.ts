import { Component, OnInit } from '@angular/core';
import { SWATCHES } from '../../data/swaches.data';
import { ColorEngine } from '../../services/engine.service';
import { ArtistBaseScreen } from '../screen.abstract';

@Component({
  selector: 'artist-collections-screen',
  templateUrl: './collections.component.html'
})
export class CollectionsScreen extends ArtistBaseScreen implements OnInit {
  static meta = {
    label: 'Collections',
    showInMenu: true
  };
  swatches = SWATCHES;
  constructor(private _engine: ColorEngine) {
    super();
  }

  ngOnInit() {}
  selectColor(color) {
    this._engine.setColor(color, 'hex', 'SWATCHES');
  }
}
