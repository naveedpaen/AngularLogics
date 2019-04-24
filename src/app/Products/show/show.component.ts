
import {
  OnChanges,
  OnInit,
  DoCheck,
  OnDestroy,
  Component
} from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnChanges,
  OnInit,
  DoCheck,
  OnDestroy {
  check = 'good';
  show: string;
  constructor() { }

  ngOnInit() {
    const a = this.check;
    this.myMethod();
  }
  ngDoCheck() {

  }

  ngOnChanges() { }
  ngOnDestroy() { }

  myMethod() {
    debugger;
    for (let index = 0; index < 5; index++) {
      document.write(index.toString());

    }
  }

}
