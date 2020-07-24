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
  nam: string = "";
  price: number;
  quantity : number;
  volume:any;
  country:any;
  gend:any;
  constructor() {}
  ngOnInit() {
    // const myObs = Observable.create(function subscribe(observer: any) {
    //   try {
    //     observer.next("Hey man!");
    //     observer.next("How are you");
    //     observer.complete();
    //     observer.next("I canot be called");
    //     throw new RangeError();
    //   } catch (err) {
    //     if (err instanceof RangeError) {
    //       console.log("out of range");
    //     }
    //     observer.error(err);
    //   }
    // });
    // myObs.subscribe(
    //   (res) => console.log(res),
    //   (error) => console.log(error),
    //   () => console.log("completed")
    // );
    // const a = range(1, 50);
    // //const ab : number[] = [1..3];
    // const b: number = 1;
    // const c = of(b);
    // const obj: number[] = [1, 2, 3];
    // const num = of(obj);
    // const numObservable = num.pipe();
    // numObservable.subscribe(
    //   (result) => {
    //     //   debugger;
    //     console.log(result);
    //     // alert("Started");
    //   },
    //   (error) => {
    //     console.log(error);
    //     //    alert("error");
    //   },
    //   () => {
    //     //   alert("success");
    //   }
    // );
    //   const many = range(1, 100);
    //   const lastThree = many.pipe(takeLast(3));
    //  lastThree.subscribe(x => console.log(x));
    // a.pipe(takeLast(1));
    // this.myObj().subscribe(result => {
    //   const a = result;
    // });
  }

  getName(event: KeyboardEvent) {
    debugger;
    this.nam += (event.target as HTMLInputElement).value + "|";
  }

  onClick(abc: any) {
    debugger;
  }

  myObj(): Observable<number[]> {
    const ob = of(1, 2, 3);
    const obj: number[] = [1, 2, 3];

    return of(obj);
  }

  // only one event can be called at a time.


      // debugger
    // first one called.
    // not getting value in data.
    // not getting  value via ngModel
  keydown1(data) {
    const abc = this.price;
  }

      // second one called.
    // not getting latest value instead it get value before keypress.
    // not getting latest value via ngModel  instead it get value before keypress.
    // 	KeyboardEvent
  
    keypress2(data) {
       debugger
    const abc = this.price;
  }


    // third one called.
    // The event occurs when the user releases a key
    // best one
    //  getting latest value in data.
    //  getting latest value via ngModel
    // 	KeyboardEvent
  
    keyup3(data) {
    debugger;
    const abc = this.price;
  }


    allowNumericOnly(key): boolean {
    debugger
      //let patt = /^\d*\.?\d*$/; // numbers + dot
      let patt = /^[0-9.,]+$/; // numbers + dot + comma
      let result = patt.test(key); // get latest key(character from keyboard)
      return result;
    }


    allowNuerimcOnly2(key): boolean {
    debugger
      //let patt = /^\d*\.?\d*$/; // numbers + dot
      let patt = /^[0-9.,]+$/; // numbers + dot + comma
      let result = patt.test(key); // get latest key(character from keyboard)
      return false;
    }

  myfunc(){
    debugger
    const a = this.volume;
  }

  myfunc3(data){
    debugger
    //const b = data.target.value;
    const a = this.volume;
  }

  myfunc4(data){
    debugger
    //const b = data.target.value;
    const a = this.country;
  }

  myfunc5(data){
    debugger
    //const b = data.target.value;
    const a = this.gend;
  }


}
