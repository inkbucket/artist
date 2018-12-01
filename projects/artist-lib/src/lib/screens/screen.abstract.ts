import { HostBinding } from '@angular/core';
import { ArtistScreen } from '../models';

export abstract class ArtistBaseScreen implements ArtistScreen {
  @HostBinding('class') className = 'ArtScreen';
}
