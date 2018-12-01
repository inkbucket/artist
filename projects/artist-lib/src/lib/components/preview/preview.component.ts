import { Component, OnInit } from '@angular/core';
import { ColorEngine } from '../../services/engine.service';

@Component({
  selector: 'artist-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {
  color;

  constructor(private _engine: ColorEngine) {}

  ngOnInit() {
    this._engine.onColorChange().subscribe(color => {
      this.color = this._engine.getColor('hex');
    });
    this._engine.triggerColorChange('FOO');
  }
}
