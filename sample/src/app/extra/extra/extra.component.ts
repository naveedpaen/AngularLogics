import { Component, OnInit } from '@angular/core';
import { observable, of, Observable, pipe, from } from 'rxjs';
import { map, tap, observeOn, throwIfEmpty } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//import { country } from "../shared/models/country";
// import { city } from "../shared/models/city";
// import { Country_City_VM } from "../shared/models/country-city";

import * as data from '../../../assets/json/coutries_cities.json';
import { ExtraService } from '../extra.service';
import { country } from '../../shared/models/country';
import { city } from '../../shared/models/city';
import { Country_City_VM } from '../../shared/models/country-city';
// /coutries_cities.json';

interface Food {
  value: string;
  viewValue: string;
}

export class comment {
postId :number;
id: number
name : string;
email:string;
body: string;
}

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css'],
})
export class ExtraComponent implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Burger' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Chips' },
  ];

cList: comment[]=[];

  data: any;
  sales: any;

  countriesList: country[];
  countries_cities_list: Country_City_VM[] = (data as any).default;
  //countries_cities_list: Country_City_VM[];
  constructor(private _http: HttpClient, private _extraService: ExtraService) {}

  ngOnInit() {
    debugger;
    // direct  no delay
    let a = 2;
    let b = 4;
    const sum = a + b;

    // create observale
    this.data = this._http.get('https://jsonplaceholder.typicode.com/todos');

    let k = 7 + 7;

    // create observabe
   // let ab = of([1, 2, 3]);
     let ab = this._http.get('https://jsonplaceholder.typicode.com/todos');
    //let ab = this._http.get('https://jsonplaceholder.typicode.com/todos/1');

    // listen
    // takeout data from observable.
    this.createObs().subscribe(
      (res) => {
        debugger;
        this.cList = res;
        console.log(res);
      },

      (error: any) => {
        console.log('Errrrror');
      },

      () => {
        console.log('completeeeed');
      }
    );

   

    // internet speed
    // server speed

    this.sales = [
      {
        brand: 'Apple',
        lastYearSale: '51%',
        thisYearSale: '40%',
        lastYearProfit: '$54,406.00',
        thisYearProfit: '$43,342',
      },
      {
        brand: 'Samsung',
        lastYearSale: '83%',
        thisYearSale: '96%',
        lastYearProfit: '$423,132',
        thisYearProfit: '$312,122',
      },
      {
        brand: 'Microsoft',
        lastYearSale: '38%',
        thisYearSale: '5%',
        lastYearProfit: '$12,321',
        thisYearProfit: '$8,500',
      },
    ];
  }


  createObs(): Observable<comment[]>{
let obj = { "id":1 ,  "Name":"Naveed"}


    const abc = this._http.post('https://jsonplaceholder.typicode.com/todos',obj)
    const ab = this._http.put('https://jsonplaceholder.typicode.com/todos/1',obj)
    
     this._http.delete('https://jsonplaceholder.typicode.com/todos/1');
    return this._http.get<comment[]>('https://jsonplaceholder.typicode.com/comments');
  }

  general() {
    const myAge = (age) => age;
    console.log(myAge(2));

    const myName = (): number => {
      return 30;
    };

    const a = myName();
  }

  //

  myAge = (age) => age * 2;

  myName = (firstName: string, LastName: string) => {
    console.log('FullName : ' + firstName + ' ' + LastName);
    console.log(this.myAge(30));
  };

  me(a, b, c) {
    return a * b * c;
  }

  me2 = (a, b, c): number => a * b * c;

  add(): number {
    return 2 + 2;
  }

  add3(): string {
    return 'abc';
  }

  mymethod() {
    let a = of([1, 2, 3]);
    const c = 'abc';
  }


}
