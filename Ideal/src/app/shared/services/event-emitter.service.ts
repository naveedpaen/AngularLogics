import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  eventObj = new EventEmitter();
  subsVar: Subscription; 
  onCallFromSeondComponent(name :string ) {
    this.eventObj.emit(name); 
  }

}
