import { Component, OnInit } from "@angular/core";
import { observable, of, Observable, pipe, from } from "rxjs";
import { map, tap, observeOn, throwIfEmpty } from "rxjs/operators";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ExtraService } from "./extra.service";

import { country } from "../shared/models/country";
import { city } from "../shared/models/city";
import { Country_City_VM } from "../shared/models/country-city";

import * as data from './../../assets/json/coutries_cities.json';
// /coutries_cities.json';
 
interface Food { 
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-extra",
  templateUrl: "./extra.component.html",
  styleUrls: ["./extra.component.css"]
})
export class ExtraComponent implements OnInit {
  foods: Food[] = [
    { value: "steak-0", viewValue: "Burger" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Chips" }
  ];

  sales: any; 

  countriesList: country[];
  countries_cities_list: Country_City_VM[]=  (data as any).default;
  //countries_cities_list: Country_City_VM[];
  constructor(private http: HttpClient, private _extraService: ExtraService) {}

  ngOnInit() { 
  //  this.countries_cities_list = (data as any).default; 
    this.myAge(22);
    this.myName("Naveed Ullah", "Ummati");

    const age = a => a;
    console.info(age(6));

    // this._extraService.getCountriesList().subscribe(a => (this.countriesList = a));
    // this._extraService.getCountriesCitiesList().subscribe(a => {
    //   debugger;
    //   this.countries_cities_list = a;
    // });

    let name = of("Naveed");
    let marks = of([1, 2, 3]);

    const objects = [
      { id: 1, name: "Fabian" },
      { id: 2, name: "Jan-Niklas" }
    ];

    // const source$ = from(marks).pipe(
    //  tap(item => item = item)
    // )
    // .subscribe(x =>{
    //   x[0]= x[0] + 1
    //    console.log(x)});

    //    let list1 = of(1, 2, 3, 4, 5, 6);
    //    let final_val = list1.pipe(
    //       tap(x => console.log("From tap() =" + x),
    //          e => console.log(e),
    //          () => console.log("Task complete")),
    //       filter(a => a % 2 === 0)
    //    );
    //    final_val.subscribe(x => console.log("Only Even numbers=" + x))

    // const objects = [
    //   { id: 1, name: "Fabian" },
    //   { id: 2, name: "Jan-Niklas" },
    // ]

    // marks.pipe(tap(item => item.name = item.name +"2" )).subscribe(result=> {
    //   debugger
    //   console.log(result)
    // });

    // abc.pipe(map(name => name.toUpperCase())).subscribe(result => {
    //   console.log(result);
    // });

    // let abcd= of(this.countries);
    // abc.subscribe(result => {console.log(abcd)});

    this.sales = [
      {
        brand: "Apple",
        lastYearSale: "51%",
        thisYearSale: "40%",
        lastYearProfit: "$54,406.00",
        thisYearProfit: "$43,342"
      },
      {
        brand: "Samsung",
        lastYearSale: "83%",
        thisYearSale: "96%",
        lastYearProfit: "$423,132",
        thisYearProfit: "$312,122"
      },
      {
        brand: "Microsoft",
        lastYearSale: "38%",
        thisYearSale: "5%",
        lastYearProfit: "$12,321",
        thisYearProfit: "$8,500"
      }
    ];
  }

  general() {
    const myAge = age => age;
    console.log(myAge(2));

    const myName = (): number => {
      return 30;
    };

    const a = myName();
  }

  //

  myAge = age => age * 2;

  myName = (firstName: string, LastName: string) => {
    console.log("FullName : " + firstName + " " + LastName);
    console.log(this.myAge(30));
  };

  me(a, b, c) {
    return a * b * c;
  }

  me2 = (a, b, c): number => a * b * c;
}
