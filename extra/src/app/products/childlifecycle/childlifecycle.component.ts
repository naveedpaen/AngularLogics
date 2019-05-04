import { Component, OnInit, OnChanges, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-childlifecycle',
  templateUrl: './childlifecycle.component.html',
  styleUrls: ['./childlifecycle.component.css']
})
export class ChildlifecycleComponent implements OnInit, OnChanges, OnDestroy {
  no: number;

  private sub: Subscription;

  constructor() {
    debugger;
  }
  @Input() id: number;

  ngOnInit() {
  }

  ngOnChanges(changes) {
    debugger;
    this.no = this.id;
  }

  ngOnDestroy() {
    debugger;
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

}
