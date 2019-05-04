import { Component } from '@angular/core';
import {
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.css']
})
export class LifecycleComponent implements OnChanges, OnInit, DoCheck, OnDestroy,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked {

  data = 100;
  constructor() {
    console.log(`Constructor data is ${this.data}`);
  }
  ngOnChanges() {
    console.log(`ngOnChanges - data is ${this.data}`);
  }
  ngOnInit() {
    console.log(`ngOnInit  - data is ${this.data}`);
  }
  ngDoCheck() {
    console.log(`ngdocheck  ${this.data}`);
  }
  ngAfterContentInit() {
    console.log(`ngAfterContentInit  ${this.data}`);
  }
  ngAfterContentChecked() {
    console.log(`ngAfterContentChecked  ${this.data}`);
  }
  ngAfterViewInit() {
    console.log(`ngAfterViewInit  ${this.data}`);
  }
  ngAfterViewChecked() {
    console.log(`ngAfterViewChecked  ${this.data}`);
  }
  ngOnDestroy() {
    console.log(`ngOnDestroy  ${this.data}`);
  }
  fnAddNumber(): void {
    this.data += 100;
  }
  deleteNumber(): void {
    this.data -= 10;
  }


}
