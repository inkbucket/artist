import { Component, Input, OnInit } from '@angular/core';
import { skipCurrent } from '../../operators/skip-current.operator';
import { ColorEngine } from '../../services/engine.service';

@Component({
  selector: 'artist-scale',
  templateUrl: './scale.component.html'
})
export class ScaleComponent implements OnInit {
  @Input() count = 10;
  colors: string[] = [];
  constructor(private _engine: ColorEngine) {}

  ngOnInit() {
    this._engine
      .onColorChange()
      .pipe(skipCurrent('SCALE'))
      .subscribe(color => {
        this.colors = this._engine.getRangeScale(this.count);
      });
    this._engine.triggerColorChange('ANY');
  }
  ngAfterViewInit() {}
  colorSelected(color) {
    this._engine.setColor(color, 'SCALE');
  }
}
