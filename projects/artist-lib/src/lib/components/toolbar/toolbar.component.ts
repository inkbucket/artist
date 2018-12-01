import { Component, HostBinding, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'artist-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
  @HostBinding('class') class = 'ArtToolbar';
  constructor(private _event: EventsService) {}

  ngOnInit() {}
  navigate(screenName: string) {
    this._event.send({ name: 'ARTIST_ON_SCREEN_SELECTION', data: screenName });
  }
}
