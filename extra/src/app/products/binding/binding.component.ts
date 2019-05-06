import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {

  disbtn = true;
  colorbtn = 'red';
  constructor() { }

  ngOnInit() {
  }

}
