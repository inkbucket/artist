import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ArtistComponent } from './artist.component';
import { InputComponent } from './components/input/input.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { PaletteBarComponent } from './components/palette-bar/palette-bar.component';
import { ScaleComponent } from './components/scale/scale.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SliderGroupComponent } from './components/slider-group/slider-group.component';
import { SliderComponent } from './components/slider/slider.component';
import { SwatchesComponent } from './components/swatches/swatches.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { artistDefaultConfig, DEFAULT_CONFIG } from './config';
import { CopyToClipboardDirective } from './directives/copy-to-clipboard/copy-to-clipboard.directive';
import { CursorDirective } from './directives/cursor/cursor.directive';
import { InputDirective } from './directives/input/input.directive';
import { PreviewDirective } from './directives/preview/preview.directive';
import { RandomDirective } from './directives/random/random.directive';
import { ArtistConfig } from './models';
import { CmykScreen } from './screens/cmyk/cmyk.component';
import { CollectionsScreen } from './screens/collections/collections.component';
import { HslScreen } from './screens/hsl/hsl.component';
import { ImageScreen } from './screens/image/image.component';
import { PaletteScreen } from './screens/palette/palette.component';
import { PreviewScreen } from './screens/preview/preview.component';
import { RgbScreen } from './screens/rgb/rgb.component';
import { ScaleScreen } from './screens/scale/scale.component';
import { SettingsScreen } from './screens/settings/settings.component';

const COMPONENTS = [
  MenubarComponent,
  PaletteBarComponent,
  SettingsComponent,
  SliderComponent,
  SwatchesComponent,
  ToolbarComponent,
  SliderGroupComponent,
  InputComponent,
  ScaleComponent
];
const SCREENS = [
  CmykScreen,
  CollectionsScreen,
  HslScreen,
  ImageScreen,
  PaletteScreen,
  RgbScreen,
  SettingsScreen,
  PreviewScreen,
  ScaleScreen
];
const DIRECTIVES = [CopyToClipboardDirective, InputDirective, RandomDirective, CursorDirective, PreviewDirective];
const SERVICES = [];

@NgModule({
  imports: [BrowserModule],
  declarations: [ArtistComponent, ...SCREENS, ...COMPONENTS, ...DIRECTIVES],
  entryComponents: [...SCREENS],
  exports: [ArtistComponent],
  providers: [...SERVICES]
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
