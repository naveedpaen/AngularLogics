import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventEmitterService } from "../../shared/services/event-emitter.service";
import {
  takeUntil,
  take,
  delay,
  tap,
  skip,
  takeLast,
  filter,
  map,
  scan,
  first,
  last,
  finalize,
  catchError,
} from "rxjs/operators";
import {
  Subject,
  Observable,
  interval,
  of,
  timer,
  fromEvent,
  range,
  from,
} from "rxjs";
import { FirstComponent } from "../first/first.component";

@Component({
  selector: "app-second",
  templateUrl: "./second.component.html",
  styleUrls: ["./second.component.css"],
})
export class SecondComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  abc = 12;
  doc: Document;
  num: number = null;
  num2: number = null;
  constructor(private _eventEmiterService: EventEmitterService) {}
  ngOnInit() {

    of(1, 2, 3, 4, 5).pipe(map(n => {
      if (n === 4) {throw 'four!';}
      return n;}),
      catchError((error) => {
      console.log( "Error Occured")
      return of("From catchError");
      }),).subscribe(x => console.log(x));



  //   let obs = interval(1000);

  //   obs.pipe(take(5),
  //   finalize(() => console.log("Finalized")))
  //  .subscribe((res) => console.log(res),
  //   (error) => console.log(error + "error"),
  //   () => console.log("Completed"));

    // obs.pipe(map(n => {return n + 2 ;}),
    //          map((n) => {return n * 2;}))
    //   .subscribe((res) => console.log(res));

    //  const source = from([
    //    { name: 'Joe', age: 30 },
    //    { name: 'Frank', age: 20 },
    //    { name: 'Ryan', age: 50 }
    //   ]);
    // const src = from(["John", "Tom", "Katy"]);
    // src.pipe(map((data) => {return data.concat("1")}))
    // .subscribe((r) => console.log(r));

    //  const example = source.pipe(first(num => num === 5));

    // const clicks = fromEvent(document, 'click');
    // const result = clicks.pipe(first(ev => ev.target.tagName === 'DIV'));
    // result.subscribe(x => console.log(x));

    //obs.subscribe(r => console.log(r));

    // const source = from([
    //   { name: "Naveed", age: 31 },
    //   { name: "Ali", age: 25 },
    // ]);
    // const example = source.pipe(filter((person) => person.age > 30));
    // example.subscribe((result) => console.log(result));

    //  result.subscribe(result => console.log(result))

    // result.subscribe(x => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const clicksOnDivs = clicks.pipe(filter(ev => ev.target.tagName === 'DIV'));
    // clicksOnDivs.subscribe(x => console.log(x));

    // alert(this.num);
    // alert(typeof this.num);
    // console.log(typeof this.num2);

    // const newObs = new Observable((obs) => {
    //   obs.next("1");
    //   obs.next("2");
    //   obs.error("Creating Error + ");
    //   obs.next("3");
    // });

    // const after = newObs.pipe(
    //   tap((result) => console.log("Tap = " + result),
    //     (error) => console.log(error + "tap error")));

    // after.subscribe(
    //   (result) => {console.log("subscribe = " + result);},
    //   (error) => {console.log("subscribe error");});

    //   .subscribe(result => {
    //   console.log("after")
    // }))

    //  const date = new Date("July 4,2020 9:18:00");
  }

  // let obs$2 = fromEvent();
  //obs$.pipe(take(5),takeUntil(this.destroy$)).subscribe((x) => console.log(x));
  myclick() {
    debugger;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
