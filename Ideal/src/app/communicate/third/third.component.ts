import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, observable, of, Observable, pipe, range } from "rxjs";
import { MessageService } from "../../shared/services/message.service";
import { takeLast } from "rxjs/operators";
import { error } from "protractor";
import { ObserversModule } from "@angular/cdk/observers";

@Component({
  selector: "app-third",
  templateUrl: "./third.component.html",
  styleUrls: ["./third.component.css"],
})
export class ThirdComponent implements OnInit {
  // learn interval delay timer range

  constructor() {}
  ngOnInit() {
    const myObs = Observable.create(function subscribe(observer: any) {
      try {
        observer.next("Hey man!");
        observer.next("How are you");
        observer.complete();
        observer.next("I canot be called");
        throw new RangeError();
      } catch (err) {
        if (err instanceof RangeError) {
          console.log("out of range");
        }
        observer.error(err);
      }
    });

    myObs.subscribe(
      (res) => console.log(res),
      (error) => console.log(error),
      () => console.log("completed")
    );

    const a = range(1, 50);

    //const ab : number[] = [1..3];

    const b: number = 1;
    const c = of(b);

    const obj: number[] = [1, 2, 3];
    const num = of(obj);
    const numObservable = num.pipe();
    numObservable.subscribe(
      (result) => {
        //   debugger;
        console.log(result);
        // alert("Started");
      },
      (error) => {
        console.log(error);
        //    alert("error");
      },
      () => {
        //   alert("success");
      }
    );

    //   const many = range(1, 100);
    //   const lastThree = many.pipe(takeLast(3));
    //  lastThree.subscribe(x => console.log(x));

    // a.pipe(takeLast(1));
    // this.myObj().subscribe(result => {
    //   debugger
    //   const a = result;
    // })
  }

  myObj(): Observable<number[]> {
    const ob = of(1, 2, 3);
    const obj: number[] = [1, 2, 3];

    return of(obj);
  }
}
