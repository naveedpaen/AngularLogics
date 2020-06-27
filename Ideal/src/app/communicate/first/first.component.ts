import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { EventEmitterService } from "../../shared/services/event-emitter.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
interface country {
  id: number;
  Name: string;
}
@Component({
  selector: "app-first",
  templateUrl: "./first.component.html",
  styleUrls: ["./first.component.css"],
})
export class FirstComponent {
  @Output() CallParent = new EventEmitter();
  fullName = "";
  age = 20;
  sentence: string = `Hello, my name is ${this.fullName}.
    I'll be ${this.age + 1} years old next month.`;

  constructor(
    private _eventEmitterService: EventEmitterService,
    private httpclient: HttpClient
  ) {}
  ngOnInit() {
    let obs = Observable.create((observer: any) => {
      observer.next("first");
     // observer.complete("Completed");
       observer.error("Sorry");
      observer.next(1);
      observer.next(true);
      observer.next(null);
    });

    obs.subscribe(
    function (observer: any)  {
        debugger;
        console.log(observer);
      },
     function (issue)  {
        alert("Error" + issue);
      },
      function () {
        alert("Done!");
      },

    );

    let obs2 = Observable.create(function annonymusFunction(observer: any) {
      observer.next("Hello Worldd!");
    });

    const abcd = Observable.create();
    const t = Observable.create(function subscribe2(observer: any) {
      observer.next("Hi");
    });

    const fullName = "Naveed Ullah";
    const age = 30;
    let sentence: string = `Hello, my name is ${fullName}.
    I'll be ${age + 1} years old next month.`;

    let abc = `${age} i am fine`;

    // this.getCountriesList().subscribe((result) => {});
  }

  firstComMethod(name: string) {
    alert("I am method of " + name + " Component.");
  }

  getCountriesList(): Observable<country[]> {
    return this.httpclient
      .get<country[]>("assets/json/countries.json", { observe: "response" })
      .pipe(
        tap((response) => console.log(response)),
        map((response) => response.body)
      );
  }

  getdata(data) {
    debugger;
  }

  dataProducer() {
    return "Hi Observable";
  }
}
