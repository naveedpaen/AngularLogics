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
  applyItalicClass = false;

  myColor = false;

  fontWeight = 'bold';
  fontStyle = 'italic';
  fontSize = '20';
  stdList: any[];

  // Null, False , '', undefined, 0
  PageHeader = 0;
  constructor() { }

  ngOnInit() {

    // this.stdList = [
    //   { id: '1', name: 'Moon', email: 'def@gmail' },
    //   { id: '2', name: 'Moon2', email: 'def@gmail' },
    // ];




  }



  addMyClasses() {
    const myClasses = {
      italic: this.applyItalicClass,
      bold: this.applyBoldClass
    };
    return myClasses;
  }

  addMyStyles() {
    const addStyles = {
      'fontSize.px': this.fontSize,
      'font-style': this.fontStyle,
      'font-weight': this.fontWeight
    };
    return addStyles;
  }



}
