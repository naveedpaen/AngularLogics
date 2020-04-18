import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  // message = 'I am from Child';

  constructor() { }
  ngOnInit() {
  }

  childMethod(){
    debugger
    console.info("i am child method.")
  }

}
