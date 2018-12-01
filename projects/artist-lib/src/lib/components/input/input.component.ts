import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { skipCurrent } from '../../operators/skip-current.operator';
import { ColorEngine } from '../../services/engine.service';

@Component({
  selector: 'artist-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {
  @Input() type = 'hex';
  inputColor = 'yellow';
  isValidColor = true;
  @HostBinding('class') class = 'ArtInput';

  constructor(private _engine: ColorEngine) {}

  ngOnInit() {
    this._engine
      .onColorChange()
      .pipe(
        skipCurrent('INPUT'),
        startWith('')
      )
      .subscribe(_ => {
        this.inputColor = this._engine.getColorCss(this.type);
      });
  }
  validateColor(inputText) {
    if (inputText.length < 5) {
      return;
    }
    try {
      this._engine.setColor(inputText, 'INPUT');
    } catch (e) {
      console.log('ERROR', e);
    }
  }
  changeColorType(type) {
    this.type = type;
    console.log('clicked ', this._engine.getColorCss(type));
    this.inputColor = this._engine.getColorCss(type);
  }
}
