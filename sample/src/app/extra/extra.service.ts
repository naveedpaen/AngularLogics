import { Injectable } from '@angular/core';
import { Observable , of, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { country } from '../shared/models/country';
import { city } from '../shared/models/city';
import { Country_City_VM } from '../shared/models/country-city';





@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  private countriesList: country[] = [
    {"id": 1 , "name": "Pakistan" , population:"56"} ,
    {"id": 2 , "name": "UAE" },
    {"id": 2 , "name": "Turkeyy"},
    {"id": 2 , "name": "Iran"},
    {"id": 2 , "name": "Saudi Arabia"},
    {"id": 2 , "name": "Siria"}
  ]


  constructor(private httpClient: HttpClient) { }

  getCountriesList() : Observable<country[]> {
    return of( this.countriesList);
  }

  
  getCountriesList2(): Observable<country[]> { 
    return this.httpClient
      .get<country[]>("assets/json/countries.json", { observe: "response" })
      .pipe(
        tap(response => console.log(response)),
        map(response => response.body)
      );
  }


  getCountriesCitiesList(): Observable<Country_City_VM[]> { 
    return this.httpClient.get<Country_City_VM[]>("assets/json/coutries_cities.json")
  }

} 
