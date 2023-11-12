import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  userFormFG = this._fb.group({
    dynamicPart: this._fb.array([
      new FormGroup({ name: new FormControl('v1'), age: new FormControl(10) }), // controls with defualt values (Method 1)
      this._fb.group({ name: 'v2', age: 11 }), // controls with defualt values (Method 1)
    ]),
  });
  newFormGroup = this._fb.group({ name: 'new v3', age: 12 });
  newFormGroup2 = new FormGroup({
    name: new FormControl('new v4'),
    age: new FormControl(10),
  });

  userFB = this._fb.group({
    id: null,
    id2: [0],
    name: '',
    age: 0,
    country: '',
    address: this._fb.group({
      city: 'lahore',
      country: '',
    }),
  });

  userForm33: FormGroup = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    country: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      country: new FormControl(''),
    }),
  });

  // userForm11  = new ([
  //   {
  //   name: new FormControl('' , [Validators.required]),
  //   age: new FormControl('', Validators.min(18))
  // }
  // ])

  userForm1 = this._fb.group({
    name: [''],
    age: [''],
  });

  userForm2 = this._fb.array([
    {
      name: [''],
      age: [''],
    },
  ]);

  profileForm = this._fb.group({
    firstName: [''],
    lastName: [''],
    address: this._fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
  });

  studentsFG = this._fb.group({
    studentsFA: this._fb.array([{ name: '', age: 0 }]),
  });
  //studentsFA = this._fb.array([{ name: '', age: 0 }])

  constructor(private _fb: FormBuilder) {
    // this.userForm = this.formBuilder.group ({
    //   name : new FormControl('asif', [Validators.required, Validators.minLength(1)]),
    //   age : new FormControl('0303',Validators.min(18) )
    // })
  }

  student: FormGroup = new FormGroup({ age: new FormControl(5) });
  student2: FormGroup = this._fb.group({ age: new FormControl(5) });
  ngOnInit(): void {
    debugger;
    this.student;

    this.student.get('age')?.setValue(10);
    this.student.get('age')?.patchValue(15);

    this.student.patchValue({ age: 20 });
    this.student.setValue({ age: 25 });

    this.student.addControl('age1', new FormControl('abc'));
    this.student.addControl('age2', new FormGroup({}));
    this.student.addControl('age3', new FormArray([]));

    this.student.setControl('age1', new FormControl('abc2'));
    this.student.setControl('age2', new FormGroup({}));
    this.student.setControl('age3', new FormArray([]));

    this.student2.addControl('age1', new FormControl('abc'));
    this.student2.addControl('age2', new FormGroup({}));
    this.student2.addControl('age3', new FormArray([]));

    this.student2.setControl('age1', new FormControl('abc2'));
    this.student2.setControl('age2', new FormGroup({}));
    this.student2.setControl('age3', new FormArray([]));

    const obj = { id: 1, name: 'asif', age: 18 };
    const keys = Object.keys(obj);
    const name = Object.name;

    //this.setDefault();
    //this.addRowMethod2();
  }

  onSave(data: FormGroup) {
    debugger;
    this.userFB.value.name;
    this.userFB.controls['name'].value;
    this.userFB.get('name')?.value;
    this.userFB.getRawValue().name;
    this.userFB.get('address')?.get('city')?.value;
  }
  get getDynamicPartLists(): FormArray {
    return this.userFormFG.get('dynamicPart') as FormArray;
  }
  // best way
  addRowMethod1() {
    const newFormGroup = this._fb.group({ name: 'new v3', age: 12 });
    const newFormGroup2 = new FormGroup({
      name: new FormControl('new v4'),
      age: new FormControl(10),
    });
    this.getDynamicPartLists.push(newFormGroup);
  }

  addRowMethod2() {
    (<FormArray>this.userFormFG.get('dynamicPart')).push(
      this._fb.group({ name: 'new', age: 18 })
    );
  }

  removeItem(index: number) {
    this.getDynamicPartLists.removeAt(index);
  }

  setDefault() {
    const obj = {
      name: 'v1',
      address: {
        city: '',
        country: '',
      },
    };
    //this.userForm.patchValue(obj);
  }

  setValues() {
    // edit case
    const obj = {
      name: 'v1',
      age: 0,
      country: '',
      address: {
        city: '',
        country: '',
      },
    };
    //this.userForm.setValue(obj);
  }

  updateName() {
    // this.userForm.name.setValue('Bashir');
    //this.lname.setValue('khan');
  }

  onSave2(data: FormGroup) {
    debugger;

    // data.patchValue({ ['lastName']: 'lv1' })
    // this.userForm.patchValue({ name: 'Noman' })

    //data.setValue({name: 'Mocrosoft'  }); // Error (all the fields not exist)

    //data.get('name').setValue('new Name')

    // Valid, touch, pristine, status, error properties.
    // console.log('control Name : ' + data.controls['name'].value)
    // console.log('control valid : ' + data.controls['name'].valid)
    // console.log('control status : ' + data.controls['name'].invalid)
    // console.log('control touched : ' + data.controls['name'].touched)
    // console.log('control pristine : ' + data.controls['name'].pristine) //pristine =  default value  not changed
    // console.log('control status : ' + data.controls['name'].status)
    // console.log('control status : ' + data.controls['name'].dirty)
    // console.log('control status : ' + data.controls['name'].errors)
    //console.log('control status : ' + data.controls['name'].get(''))

    // set value methods

    //  const abc = data.controls['name'].get('')
    //  const abc2 = data.controls['name'].getRawValue()
    //  const abc3 = data.controls['name'].markAsPristine()
    //  const abc4 = data.controls['name'].patchValue('zee')
    //  const abc5 = data.controls['name'].markAsPristine()
    //  const abc6 = data.controls['name'].setValue('new Name')
    //  const abc7 = data.controls['name'].setValidators(Validators.minLength(2))
    //  const abc8 = data.controls['name'].reset('new Name')
    //const abc9 = data.controls['name'].removeValidators(Validators.minLength(2))

    // Form properties
    // console.log('Form Name : ' + data.value.name)
    // console.log('Form Name (another way) : ' + data.controls['name'].value)
    // console.log('Form Mobile : ' + data.value.age)
    // console.log('Form valid : ' + data.valid)
    // console.log('Form status : ' + data.invalid)
    // console.log('Form touched : ' + data.touched)
    // console.log('Form pristine : ' + data.pristine)
    // console.log('Form status : ' + data.status)

    // important methods
    // data.controls['name'].value
    // data.controls['name'].valid
    // data.controls['name'].invalid
    // data.controls['name'].touched
    // data.controls['name'].untouched
    // data.controls['name'].pristine
    // data.controls['name'].status
    // data.controls['name'].dirty
    // data.controls['name'].errors

    // this.userForm.value.name;
    // this.userForm.valid;
    // this.userForm.invalid;
    // this.userForm.touched;
    // this.userForm.untouched;
    // this.userForm.pristine;
    // this.userForm.status;
    // this.userForm.dirty;
    // this.userForm.errors;

    // [bc-value]="form.get(controlData.sFieldName).value"
  }
}
