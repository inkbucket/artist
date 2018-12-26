import { Component, OnInit } from '@angular/core';
import { ColorEngine } from 'artist/lib/services/engine.service';
import { SWATCHES } from '../../data/swaches.data';

@Component({
  selector: 'artist-swatches',
  templateUrl: './swatches.component.html'
})
export class SwatchesComponent implements OnInit {
  swatches = SWATCHES;
  constructor(private _engine: ColorEngine) {
    console.log(this.swatches);
  }

  ngOnInit() {}
  selectColor(color) {
    this._engine.setColor(color, 'hex', 'SWATCHES');
  }
}
