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
import { country } from 'src/app/shared/models/country';
import { HttpClient } from '@angular/common/http';

export class test {
  id: number;
  namee: string;
}

@Component({
  selector: "app-second",
  templateUrl: "./second.component.html",
  styleUrls: ["./second.component.css"],
})
export class SecondComponent implements OnInit {
  countriesList: country[];
  country2: test[];
  country3:any;
  myObj = {
    id: 1,
    name: "Naveed",
    home: [
      { house: 1, email: "naveedpaen" },
      { house: 1, email: "naveedpaen" },
    ],
  };
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this. getCountriesListWithAny().subscribe(res => {
      debugger
      this.countriesList = <country[]> res;
    });

     this. getCountriesListWithMap().pipe(map(res=><country[]>res)).subscribe(res => {
    this.countriesList = res;
    });
    
    this.getCountriesList().subscribe(res => {
    //  this.countriesList = res;
      //  this.country2 = res;
    });


    const abc = this.myObj.home.find((res) => res.house === 1).email; // just return email
    const abcd = (this.myObj.home.find((res) => res.house === 1).email =
      "naveedummati"); // assign value to email
  }

   getCountriesList(): Observable<country[]> { 
        return this.http.get<country[]>("assets/json/countries.json")
    }

   getCountriesListWithMap() { 
        return this.http.get("assets/json/countries.json")
    }

   getCountriesListWithAny() { 
        return this.http.get("assets/json/countries.json")
    }
}
