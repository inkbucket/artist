import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'artist-lib',
  templateUrl: './artist.template.html'
})
export class ArtistComponent implements OnInit {
  screens = [];
  constructor(private _configService: ConfigService) {}

  ngOnInit() {}
}
