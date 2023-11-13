import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  ZeroIsInvalidAtStartValidator,
  atLeastOneOptionSelectedValidator,
  phoneNumberValidator,
  synNoLeadingSpaceValidator,
} from '../validators/validators';

@Component({
  selector: 'app-reactive-sample',
  templateUrl: './reactive-sample.component.html',
  styleUrls: ['./reactive-sample.component.css'],
})
export class ReactiveSampleComponent {
  stuFG1 = new FormGroup({
    name: new FormControl(''),
    fatherName: new FormControl('', [
      Validators.required,
      synNoLeadingSpaceValidator,
    ]),
    age: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
    gender: new FormControl('male'),
    sports: new FormGroup(
      {
        cricket: new FormControl(false),
        football: new FormControl(false),
        other: new FormControl(false),
      },
      { validators: atLeastOneOptionSelectedValidator }
    ),
  });

  stuFG2 = this._fb.group({
    name: '',
    fatherName: ['', Validators.required, synNoLeadingSpaceValidator],
    age: [0, Validators.min(1), Validators.max(10)],
    gender: 'male',
    sports: this._fb.group(
      { cricket: false, football: false, other: false },
      { validators: atLeastOneOptionSelectedValidator }
    ),
  });

  stuFG3 = new FormGroup({
    formControlName: new FormControl('value'),
    name: new FormControl(''),
    list: new FormArray([
      new FormGroup({
        formControlName1: new FormControl('first'),
        formControlName2: new FormControl('second'),
      }),
    ]),
  });

  constructor(private _fb: FormBuilder) {}

  onSubmit(form: FormGroup) {
    debugger;
  }

  get sports(): FormGroup {
    return this.stuFG1.get('sports') as FormGroup;
  }

  get age() {
    return this.stuFG1.controls['age'];
  }

  get name(): AbstractControl {
    return this.stuFG1.controls['name'];
  }

  get fatherName(): AbstractControl {
    return this.stuFG1.controls['fatherName'];
  }

  sports1(): FormControl {
    return this.stuFG1.controls.name;
  }

  get name2(): FormControl {
    return this.stuFG3.controls.name;
  }

  formControlName1(index: number): FormControl {
    return this.stuFG3.controls.list.at(index).controls.formControlName1;
  }
}
