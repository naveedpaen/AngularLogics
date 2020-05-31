import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-eager',
  templateUrl: './eager.component.html',
  styleUrls: ['./eager.component.css']
})
export class EagerComponent implements OnInit {

  constructor( private _utilityService: UtilityService) { }

  ngOnInit() {
  }

  add() {
    this._utilityService.count += 1;
  }

}