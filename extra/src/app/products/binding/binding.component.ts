import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


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
  myList: any;

  // Null, False , '', undefined, 0
  PageHeader = 0;

  @Output myEventName 
  constructor() { }
  ngOnInit(): void {


    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  onInit() {

    // this.stdList = [
    //   { id: '1', name: 'Moon', email: 'def@gmail' },
    //   { id: '2', name: 'Moon2', email: 'def@gmail' },
    // ];


    this.myList = [
      { id: '1', name: 'naveed', gender: 'male' },
      { id: '2', name: 'maryam', gender: 'female' },
      { id: '3', name: 'ali', gender: 'male' },
    ]


  }

}i', gender: 'male' },
    ]


  }

}