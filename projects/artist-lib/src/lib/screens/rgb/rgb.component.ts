import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'artist-rgb-screen',
  templateUrl: './rgb.component.html'
})
export class RgbScreen implements OnInit {
  static meta = {
    label: 'RGB',
    showInMenu: true
  };
  constructor() {}

  ngOnInit() {}
}
