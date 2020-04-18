import { Component, OnInit } from '@angular/core';
import { ComoneComponent } from '../comone/comone.component';

@Component({
  selector: 'app-comtwo',
  templateUrl: './comtwo.component.html',
  styleUrls: ['./comtwo.component.css']
})
export class ComtwoComponent implements OnInit {

  constructor(private com1: ComoneComponent) { }
  ngOnInit() {}
  com2Method() {
    this.com1.com1Method();
  }
}
