import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { EventEmitterService } from '../../shared/services/event-emitter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { tap, map, timeout } from 'rxjs/operators';
import { country } from 'src/app/shared/models/country';
import { SmallComponent } from 'src/app/extra/small/small.component';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
})
export class FirstComponent implements AfterViewInit {
  //@ViewChild(SmallComponent) child;

  @ViewChild(SmallComponent) child: SmallComponent;
 // @ViewChild("small") child2: SmallComponent;




  msg: string;
  constructor(
    private _eventEmitterService: EventEmitterService,
    private httpclient: HttpClient
  ) {}
  ngOnInit() {
  }
  
  ngAfterViewInit() {
    debugger;
    //const ee =  document.getElementById('sp').innerText;
    //const ee2 =  document.getElementById('sp').innerHTML;
    // const ee24 =  document.getElementById('lastName').innerText;
   // const dd = this.spa.nativeElement.value;
    //  const ee24 =  document.getElementById('spa').innerText;
    //  const ee23 =  document.getElementById('spa').innerHTML;
    // let abc = (<HTMLInputElement> document.getElementById('spa')).value;
    // this.last.nativeElement.value = "Ali";
    // const k =   this.last.nativeElement.value;
    this.msg = this.child.name; 
  }
}
