import { Component, OnInit } from '@angular/core';
import { ArtistBaseScreen } from '../screen.abstract';

@Component({
  selector: 'artist-preview-screen',
  templateUrl: './preview.component.html'
})
export class PreviewScreen extends ArtistBaseScreen implements OnInit {
  static meta = {
    label: 'preview',
    showInMenu: false
  };

  ngOnInit() {}
}
