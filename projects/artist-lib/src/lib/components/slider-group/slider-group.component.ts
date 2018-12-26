import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  QueryList
} from '@angular/core';
import { ColorEngine } from 'artist/lib/services/engine.service';
import { generateID } from 'artist/lib/utilities/helpers';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'artist-slider-group',
  templateUrl: './slider-group.component.html'
})
export class SliderGroupComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() channel = '';
  @HostBinding('class') className = 'ArtSliderGroup';
  @ContentChildren(SliderComponent, { descendants: true }) sliders: QueryList<SliderComponent>;
  private _value = [];
  private _id = generateID();
  private die: Subject<1> = new Subject();
  constructor(private _engine: ColorEngine) {}

  ngOnInit() {
    this._engine
      .onColorChange()
      .pipe(
        // skipCurrent(this._id),
        takeUntil(this.die)
      )
      .subscribe((data: any) => {
        console.log('init-->', data);
        if (data.emitFrom === this._id) {
          this.setCurrentValuesToSliders(data.color);
        } else {
          this.setCurrentValuesToSliders(data.color);
          this._value = this._engine.getColorChannel(this.channel);
          this.setValuesToSliders(this._value, data.emitFrom);
        }
      });
  }
  setValuesToSliders(value, filterOutId) {
    if (Array.isArray(value)) {
      this._value = value.map(x => this.fixDecimals(x));
      this.sliders.forEach((s, i) => {
        if (s.id !== filterOutId) {
          s.setValue(this._value[i]);
        }
      });
    } else {
      this.sliders[0].setValue(value);
    }
  }

  setCurrentValuesToSliders(value) {
    this.sliders.forEach((s, i) => {
      s.setCurrentValue(value);
    });
  }

  ngAfterContentInit() {
    this._engine.triggerColorChange('hello');
    const values = this.sliders.map(s => s.getValueChange());
    merge(...values).subscribe((a: any) => {
      this._value[a.index] = a.value;
      this._engine.setColorChannel(this.channel, this._value, this._id);
    });
  }

  fixDecimals(val: any) {
    if (typeof val === 'number') {
      return Number(val.toFixed(2));
    }
    return val;
  }

  ngOnDestroy() {
    console.log('destroy');
    this.die.next(1);
    this.die.complete();
  }
}
