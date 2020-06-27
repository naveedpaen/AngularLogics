import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../../shared/services/event-emitter.service';

@Component({ 
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent {
  constructor(private _eventEmiterService:EventEmitterService) { }
  ngOnInit() {}
  emitEventToCallFirstComponentMethod(name: string){ 
    this._eventEmiterService.onCallFromSeondComponent(name);    
  } 

}
