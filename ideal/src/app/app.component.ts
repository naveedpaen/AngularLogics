import { Component } from '@angular/core';
import { interval, lastValueFrom, take } from 'rxjs';

export interface abc {
  id: number | string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';

  constructor() {
    // this.calculation();
  }

  async ngOnInit() {
    // debugger;
    // const source$ = interval(1000).pipe(take(10));
    // source$.subscribe((res) => console.log(res));
    // const finalNumber = await lastValueFrom(source$);
    // console.log(`The final number is ${finalNumber}`);
  }

  calculation() {
    const myNumber: number[] = [2, 3, 4, 5, 6];
    for (let index = 1; index < myNumber.length; index = index + 2) {
      console.log(myNumber[index]);
    }
  }
}
