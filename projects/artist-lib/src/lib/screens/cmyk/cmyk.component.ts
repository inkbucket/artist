import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'artist-cmyk-screen',
  templateUrl: './cmyk.component.html'
})
export class CmykScreen implements OnInit {
  static meta = {
    label: 'CMYK',
    showInMenu: true
  };
  constructor() {}

  ngOnInit() {}
}
