import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'artist-lib',
  template: `
    <p>artist-lib works!</p>
  `,
  styles: []
})
export class ArtistComponent implements OnInit {
  constructor(private _configService: ConfigService) {}

  ngOnInit() {
    console.log('config', this._configService.get());
  }
}
