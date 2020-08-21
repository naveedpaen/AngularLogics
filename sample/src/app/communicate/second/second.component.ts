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
import * as check from '../../../assets/json/checkpoints.json'

 


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
  checks = (check as any).default.result;
   trees = [ 
    "birch", 
    "maple", 
    "oak", 
    "poplar" 
  ];
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
  constructor(private http: HttpClient) {
  //  document.write("dddddddddddddddddddddd");

  }
  ngOnInit() {
    debugger
    let myArray= [];
  const abc4 =  document.getElementsByName("myspan").forEach(res=> myArray.push(res.innerHTML));
   // ?
    const abc2 = this.myObj.home.find((res) => res.house === 1).email; // just return email
    const abcd2 = (this.myObj.home.find((res) => res.house === 1).email =
      "naveedummati"); // assign value to email
  } 



 myFunction() {
}

  // Q. 1. How to delete object from array
  deleteItem(indx) {
    debugger
    // Method 1.
    // best way, on base of index
    const abc = this.checks.subConfirmationStatuses.splice(indx,1);
 
    //Method 2.
    // inside array delete one item on base of id.
    //let deleteId =  this.checks.subConfirmationStatuses.findIndex(res => res.subConfirmationStatusID===40561);
   // const deletedItem2 = this.checks.subConfirmationStatuses.splice(deleteId,1);

    // Method 3
   //worst way.  inside array delete one item on base of id.
  // const ret2 =  this.checks.subConfirmationStatuses.find(res => res.subConfirmationStatusID===40561)
   //const ind = this.checks.subConfirmationStatuses.indexOf(ret2)
   //const deletedItem1 = this.checks.subConfirmationStatuses.splice(ind,1);
  }


  //. Q1.b.  How to delete an object inside child array.
  // Method 2
  // delete on base of child id and parentObj
  deleteImage2(IdToDelete, parentObj) {
    debugger
   const parentIndex = this.checks.subConfirmationStatuses.indexOf( parentObj); 
   const childIndex = this.checks.subConfirmationStatuses[parentIndex].subConfirmationDocumentStatuses.findIndex(res => res.documentID === IdToDelete)
   this.checks.subConfirmationStatuses[parentIndex].subConfirmationDocumentStatuses.splice(childIndex,1);
  }


  //. Q1. How to delete an object inside child array.
  // Method 1
  // best way.  on base of index.
  deleteImage(parentIndex ,childIndex) {
   const ParentObj = this.checks.subConfirmationStatuses[parentIndex].subConfirmationDocumentStatuses.splice(childIndex,1);
   // ParentObj.subConfirmationDocumentStatuses.splice(childIndex,1);
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
