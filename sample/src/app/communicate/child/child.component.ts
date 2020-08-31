import { Component, OnInit } from '@angular/core';

export class userVM {
  id:number;
  name:string;
}

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
}) 
export class ChildComponent implements OnInit {
  // message = 'I am from Child';
 // user2: any ;
 // user: any = { id : null ,  name: "" };
 disableSaveBtn = true;
  user: userVM =new userVM ();
  constructor() {}
  ngOnInit() {}

  childMethod() {
    debugger;
    console.info('i am child method.');
  }
  submitForm(data) {
    debugger;
    const d = data.value;
    const a = this.user;
  }
  checkNull(){
    debugger
   // if (this.user.name  != null && this.user.name  != "" ) {
    if (this.user.name   ) {
      this.disableSaveBtn = false;
    } else {
      this.disableSaveBtn = true;
    }
  }
save() {
  debugger
  const a = this.user;
}

cancel(){
  debugger
  this.user.id= null;
  this.user.name= null;
  const abc = this.user;

 


 // this.user= null;
}

}
