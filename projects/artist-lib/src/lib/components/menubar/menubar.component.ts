import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'artist-menubar',
  templateUrl: './menubar.component.html'
})
export class MenubarComponent {
  @Input() screens = [];
  @Output() screenSelected = new EventEmitter();
  @HostBinding('class') className = 'ArtMenuBar';

  onScreenSelection(screenName) {
    this.screenSelected.next(screenName);
  }
}
