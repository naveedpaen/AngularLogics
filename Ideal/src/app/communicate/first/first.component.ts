import { Component, OnInit } from "@angular/core";
import { EventEmitterService } from "src/app/shared/services/event-emitter.service";

@Component({
  selector: "app-first",
  templateUrl: "./first.component.html",
  styleUrls: ["./first.component.css"],
})
export class FirstComponent  {
  constructor(private _eventEmitterService: EventEmitterService) {}
  ngOnInit() {
    // subscribe means wait until you get something.
    // below line basically starts listening for an event to emit from any where.
    this._eventEmitterService.eventObj.subscribe((name:string ) => {
      this.firstComMethod(name);
    });
  }

  

   firstComMethod(name: string) {
    alert("I am method of " + name + " Component.");
  }

}
