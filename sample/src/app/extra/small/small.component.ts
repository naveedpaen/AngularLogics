import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'small',
  templateUrl: './small.component.html',
  styleUrls: ['./small.component.css'],
})
export class SmallComponent implements OnInit {
  message = 'Whats up';
  name = 'hm';
  constructor() {}

  ngOnInit(): void {}

  change(){
    debugger
  const abc =  this.name;
  return this.name;
  }

  latest(){
    debugger
    return this.name;
  }
}
