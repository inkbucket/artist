import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'artist-scale-screen',
  templateUrl: './scale.component.html'
})
export class ScaleScreen implements OnInit {
  static meta = {
    label: 'scale',
    showInMenu: false
  };
  constructor() {}

  ngOnInit() {}
}
