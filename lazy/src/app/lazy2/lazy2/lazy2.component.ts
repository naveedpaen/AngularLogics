import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-lazy2',
  templateUrl: './lazy2.component.html',
  styleUrls: ['./lazy2.component.css']
})
export class Lazy2Component implements OnInit {

  constructor( private _utilityService: UtilityService) { }

  ngOnInit() {
  }
  add() {
    this._utilityService.count += 1;
  }
}
