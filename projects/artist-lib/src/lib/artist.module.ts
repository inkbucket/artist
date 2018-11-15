import { ModuleWithProviders, NgModule } from '@angular/core';
import { ArtistComponent } from './artist.component';
import { artistDefaultConfig, DEFAULT_CONFIG } from './config';
import { ArtistConfig } from './models';

@NgModule({
  declarations: [ArtistComponent],
  exports: [ArtistComponent]
})
export class ArtistModule {
  static forRoot(globalConfig: Partial<ArtistConfig> = {}): ModuleWithProviders {
    return {
      ngModule: ArtistModule,
      providers: [
        {
          provide: DEFAULT_CONFIG,
          useValue: { ...artistDefaultConfig, ...globalConfig }
        }
      ]
    };
  }
}
