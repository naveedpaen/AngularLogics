import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comone',
  templateUrl: './comone.component.html',
  styleUrls: ['./comone.component.css']
})
export class ComoneComponent implements OnInit {

  constructor() { }
  ngOnInit() {}
  public com1Method(){
    alert("I am a method of com1");    
  }
}
