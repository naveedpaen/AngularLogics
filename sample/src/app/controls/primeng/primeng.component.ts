import { Component, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-primeng',
  templateUrl: './primeng.component.html',
  styleUrls: ['./primeng.component.css']
})
export class PrimengComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Burger'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Chips'}
  ];

sales: any;

  constructor() { }

  ngOnInit() {
  }

}
