import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {

  disbtn = true;
  colorbtn = 'red';

  applyTheseCssClasses = 'italic bold mat-raised-button mat-primary';
  removeBoldClass = false;

  applyBoldClass = true;
  applyItalicClass = true;


  constructor() { }

  ngOnInit() {
  }

  addMyClasses() {
    const myClasses = {
      italic: this.applyItalicClass,
      bold: this.applyBoldClass
    }
    return myClasses;
  }

}
