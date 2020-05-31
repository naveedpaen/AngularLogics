import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css']
})
export class LazyComponent implements OnInit {

  constructor( private _utilityService: UtilityService) { }

  ngOnInit() {
  }
  add() {
    this._utilityService.count += 1;
  }
}