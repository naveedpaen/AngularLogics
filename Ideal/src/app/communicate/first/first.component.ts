import { Component, OnInit } from "@angular/core";
import { EventEmitterService } from "../../shared/services/event-emitter.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: "app-first",
  templateUrl: "./first.component.html",
  styleUrls: ["./first.component.css"],
})
export class FirstComponent  {
  constructor(private _eventEmitterService: EventEmitterService, 
    private httpclient: HttpClient) {}
  ngOnInit() {
 const options = {
  'headers': new HttpHeaders(
    { 'test': '123'}

  
  )

 };
 console.log(options.headers.get( 'X-Requested-With'));
    this.httpclient.get("http://localhost:3000/countries", options).subscribe(result => {
debugger

    });


    // subscribe means wait until you get something.
    // below line basically starts listening for an event to emit from any where.
    // this._eventEmitterService.eventObj.subscribe((name:string ) => {
    //   this.firstComMethod(name);
    // });
  }

  

   firstComMethod(name: string) {
    alert("I am method of " + name + " Component.");
  }

}
