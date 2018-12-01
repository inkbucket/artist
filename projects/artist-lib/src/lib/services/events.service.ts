import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArtistEvent } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _event: Subject<ArtistEvent> = new Subject();

  constructor() {}

  watch(): Observable<ArtistEvent> {
    return this._event.asObservable();
  }

  send(event: ArtistEvent) {
    this._event.next(event);
  }
}
