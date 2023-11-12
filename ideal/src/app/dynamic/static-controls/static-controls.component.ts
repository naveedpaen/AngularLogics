import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-static-controls',
  templateUrl: './static-controls.component.html',
  styleUrls: ['./static-controls.component.css'],
})
export class StaticControlsComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('asif'),
    age: new FormControl('10'),
  });
}
