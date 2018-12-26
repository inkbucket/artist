import { Component, OnInit } from '@angular/core';
import { ColorEngine } from '../../services/engine.service';
import { ArtistBaseScreen } from '../screen.abstract';

@Component({
  selector: 'artist-image-screen',
  templateUrl: './image.component.html'
})
export class ImageScreen extends ArtistBaseScreen implements OnInit {
  static meta = {
    label: 'Image',
    showInMenu: true
  };

  selectedFile: File;
  localUrl: any;
  reader = new FileReader();
  colors = [];

  constructor(private _engine: ColorEngine) {
    super();
  }
  async ngOnInit() {
    const vib: any = await this.initializeVibrant();
    const vibrant = vib.default;
    console.log('vib', vib.default);
    this.reader.onload = (e: any) => {
      this.localUrl = e.target.result;
      console.log('e,taregt', this.selectedFile);
      vibrant.from(this.localUrl).getPalette((err, p) => {
        console.log('___', p);
        if (err) {
          console.log('error', err);
        }
        this.colors = Object.entries(p)
          .map(x => x[1])
          .filter(x => x != null)
          .sort((a: any, b: any) => b._population - a._population)
          .map((c: any) => `rgb(${c.r},${c.g},${c.b})`);
      });
    };
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.reader.readAsDataURL(this.selectedFile);
  }
  imageSelected(color) {
    this._engine.setColor(color, 'IMAGE');
  }

  clear() {
    this.selectedFile = null;
    this.reader = new FileReader();
    this.localUrl = null;
    this.colors = [];
  }

  private initializeVibrant() {
    return new Promise((res, rej) => {
      const vibrant = import(/* webpackChunkName: "vibrant" */ 'node-vibrant');
      // const vibrant = {};
      res(vibrant as any);
      if (!vibrant) {
        rej('error occured');
      }
    });
  }
}
