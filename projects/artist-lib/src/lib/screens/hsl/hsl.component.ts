import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'artist-hsl-screen',
  templateUrl: './hsl.component.html'
})
export class HslScreen implements OnInit {
  static meta = {
    label: 'HSL',
    showInMenu: true
  };
  constructor() {}

  ngOnInit() {}
}
