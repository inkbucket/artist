import { Inject, Injectable } from '@angular/core';
import { DEFAULT_CONFIG } from '../config';
import { ArtistConfig } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(@Inject(DEFAULT_CONFIG) private _config: ArtistConfig) {}
  get() {
    return this._config;
  }
}
