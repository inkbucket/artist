import { InjectionToken } from '@angular/core';
import { ArtistConfig } from './models';

export const DEFAULT_CONFIG = new InjectionToken<ArtistConfig>('default-config');

export const artistDefaultConfig: ArtistConfig = {
  outputColorFormat: 'hex'
};
