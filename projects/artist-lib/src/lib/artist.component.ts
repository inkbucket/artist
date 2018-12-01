import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  HostBinding,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { CmykScreen } from './screens/cmyk/cmyk.component';
import { CollectionsScreen } from './screens/collections/collections.component';
import { HslScreen } from './screens/hsl/hsl.component';
import { ImageScreen } from './screens/image/image.component';
import { PaletteScreen } from './screens/palette/palette.component';
import { PreviewScreen } from './screens/preview/preview.component';
import { RgbScreen } from './screens/rgb/rgb.component';
import { ScaleScreen } from './screens/scale/scale.component';
import { SettingsScreen } from './screens/settings/settings.component';
import { ConfigService } from './services/config.service';
import { EventsService } from './services/events.service';
import { getScreensMeta } from './utilities/helpers';

@Component({
  selector: 'artist-main',
  templateUrl: './artist.template.html',
  styleUrls: ['../styles/root.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistComponent implements OnInit {
  allScreens = getScreensMeta(
    Object.values([
      CmykScreen,
      CollectionsScreen,
      HslScreen,
      ImageScreen,
      PaletteScreen,
      RgbScreen,
      ScaleScreen,
      PreviewScreen,
      SettingsScreen
    ])
  );
  selectedScreen = this.allScreens[0].name;
  @HostBinding('class') className = 'ArtMain';

  @ViewChild('holder', { read: ViewContainerRef }) holder: ViewContainerRef;
  constructor(
    private _configService: ConfigService,
    private _compFacResolver: ComponentFactoryResolver,
    private _dc: ChangeDetectorRef,
    private _event: EventsService
  ) {}

  ngOnInit() {
    console.log('gg', this.allScreens);
    // this.allScreens.forEach(screen => {
    //   this.holder.createComponent(this._compFacResolver.resolveComponentFactory(screen.screen));
    // });
    this._event
      .watch()
      .pipe(
        filter(e => e.name === 'ARTIST_ON_SCREEN_SELECTION'),
        map(e => e.data)
      )
      .subscribe(screenName => {
        this.onScreenSelection(screenName);
      });
  }

  getScreenNames() {
    return this.allScreens.map(s => s.screen.meta);
  }
  onScreenSelection(screenName: string) {
    this.selectedScreen = screenName;
    const comp = this.allScreens.find(s => s.name === screenName);
    if (this.holder.get(0)) {
      this.holder.detach();
      this.holder.clear();
    }
    this.holder.createComponent(this._compFacResolver.resolveComponentFactory(comp.screen));
    this._dc.detectChanges();
  }
}
