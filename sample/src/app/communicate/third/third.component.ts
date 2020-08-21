import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { Subscription, observable, of, Observable, pipe, range } from "rxjs";
import { MessageService } from "../../shared/services/message.service";
import { takeLast } from "rxjs/operators";
import { error } from "protractor";
import { ObserversModule } from "@angular/cdk/observers";
import { stringify } from 'querystring';
import { StudentVM } from '../forth/forth.component';

@Component({ 
  selector: "app-third",
  templateUrl: "./third.component.html",
  styleUrls: ["./third.component.css"],
})

export class ThirdComponent implements OnInit {
  @ViewChild("nameInput") nameRef :ElementRef

  studentObj: {id:"" , "name":""}

  userObj: any= {
    "id": 1,
    "name": "Naveed Ullah"
  }
  studentList: any = [
    {"Id": 1, "Name":"Ali"},
    {"Id": 2, "Name":"Asif"},
    {"Id": 3, "Name":"Ahmad"},
  ]
  selectedStudent="";
  constructor() {}
  ngOnInit() {

     
  }

  save(data) {
    debugger
    console.log(data.controls['id'].value);
    console.log(JSON.stringify(data.value, null, 4));
    console.log("Touched: " + data.touched );
    console.log("Submitted: " + data.submitted );
    console.log("Valid: " + data.valid );
  }

  getdata( ){
    debugger
 const abc = this.nameRef.nativeElement.value;
  }
  submitForm(data){
    debugger
    // Id 
    console.log("ID Value: " + data.controls['id'].value);
    console.log("is ID Touched: " +data.controls['id'].touched);
    console.log("is ID Valid: " +data.controls['id'].valid);
    console.log("is ID Dirty: " +data.controls['id'].dirty);

    // Form
    console.log("Form Value: " + JSON.stringify(data.value, null, 4));
    console.log("Is Form Touched: " + data.touched );
    console.log("Is Form Submitted: " + data.submitted );
    console.log("Is Form Valid: " + data.valid );
    console.log("Is Form Dirty: " + data.dirty );
  }

}

