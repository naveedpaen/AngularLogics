import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-eager2',
  templateUrl: './eager2.component.html',
  styleUrls: ['./eager2.component.css']
})
export class Eager2Component implements OnInit {

  constructor( private _utilityService: UtilityService) { }

  ngOnInit() { 
  }

  add() {
    this._utilityService.count += 1;
  }

}
