import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { EventEmitterService } from "../../shared/services/event-emitter.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, observable } from "rxjs";
import { tap, map, timeout } from "rxjs/operators";
import { country } from "src/app/shared/models/country";

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
  countriesList$: Observable<country[]>;
  countriesList: country[];
  constructor(
    private _eventEmitterService: EventEmitterService,
    private httpclient: HttpClient
  ) {}
  ngOnInit() {



    
    const myObs = new Observable((observer) =>{
      observer.next("one")
      observer.next("Two")
    })

 











    // Create simple observable that emits three values
    const myObservable = of(1, 2, 3);
    this.countriesList$ = this.getCountriesList();

this.getCountriesList().subscribe((result: country[]) => {
  this.countriesList = result;
});

    // Create observer object
    const myObserver = {
      next: (x) => {
        console.log("Observer got a next value: " + x);
        // alert("alert :)");
      },
      error: (err) => console.error("Observer got an error: " + err),
      complete: () => console.log("Observer got a complete notification"),
    };

    // Execute with the observer object
    myObservable.subscribe(myObserver);

    let obs = Observable.create((observer: any) => {
      debugger;
      //  observer.error("Sorry");
      observer.next("first");
      //observer.next(1);
      // setTimeout(() => {
      //   debugger
      //   observer.next("inside settimeout");
      // }, 5000);
      observer.next(true);
      observer.complete("Completed");
    });

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

  getCountriesList2(): Observable<country[]> {
    return this.httpclient
      .get<country[]>("assets/json/countries.json", { observe: "response" })
      .pipe(
        tap((response) => console.log(response)),
        map((response) => response.body)
      );
  }

  getCountriesList(): Observable<country[]> {
    return this.httpclient.get<country[]>("assets/json/countries.json");
  }

  getdata(data) {
    debugger;
  }

  dataProducer() {
    return "Hi Observable";
  }
}
