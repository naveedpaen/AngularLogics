import { Component, OnInit } from '@angular/core';
import { of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-forth',
  templateUrl: './forth.component.html',
  styleUrls: ['./forth.component.css']
})
export class ForthComponent  {

constructor() {
  const nums = of(1, 2, 3, 4, 5);

// Create a function that accepts an Observable.
const squareOddVals = pipe(
  filter((n: number) => n % 2 !== 0),
  map(n => n * n)
);

// Create an Observable that will run the filter and map functions
const squareOdd = squareOddVals(nums);

// Subscribe to run the combined functions
squareOdd.subscribe(x => console.log(x));
}



}
