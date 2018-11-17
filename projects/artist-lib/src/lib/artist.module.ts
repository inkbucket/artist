import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ArtistComponent } from './artist.component';
import { artistDefaultConfig, DEFAULT_CONFIG } from './config';
import { ArtistConfig } from './models';
import { PaletteScreen } from './screens/palette/palette.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [ArtistComponent, PaletteScreen],
  entryComponents: [PaletteScreen],
  exports: [ArtistComponent],
  providers: []
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
