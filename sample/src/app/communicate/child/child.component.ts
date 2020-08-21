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
  user: any = {id : 1,  name: "khan" };
  constructor() {}
  ngOnInit() {}

  childMethod() {
    debugger;
    console.info('i am child method.');
  }
  submitForm() {
    debugger;
    const a = this.user;
  }
}
