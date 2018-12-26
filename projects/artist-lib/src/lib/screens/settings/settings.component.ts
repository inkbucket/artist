import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'artist-settings-screen',
  templateUrl: './settings.component.html'
})
export class SettingsScreen implements OnInit {
  static meta = {
    label: 'settings',
    showInMenu: false
  };
  constructor() {}

  ngOnInit() {}
}
