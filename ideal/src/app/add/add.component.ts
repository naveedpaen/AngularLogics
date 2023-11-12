import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  studentsFG2 = this._fb.group({ studentsFA: this._fb.array([{ name: 'v3', age: 3 }]) })
  studentsFG = this._fb.group({ studentsFA: this._fb.array([this._fb.group({ name: 'v3', age: 3 })]) })
  //studentsFA = this._fb.array([{ name: '', age: 0 }])


  constructor(private _fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.addStudent()
    this.addStudent()
  }

  setDefault() {
    this.studentsFG.reset();
  }

  get studentsFA(): FormArray {
    return this.studentsFG.get('studentsFA') as FormArray
  }

  addStudent() {

    const obj = this._fb.group({ name: 'a', age: 1 }) // method 1 best one
    // const obj = this._fb.group({name: new FormControl('mm'),age: new FormControl('22')}) // method 2
    this.studentsFA.push(obj)
  }

  insertStudent() {
    debugger
    const obj = this._fb.group({ name: 'vv', age: 50 }) // method 1 best one
    this.studentsFA.insert(0, obj);
  }

  reset() {
    debugger;
    // update form Group completely OR update value only

    // Method 1   replaces the entire form group at the specified index
    //this.studentsFA.setControl(0, this._fb.group({ name: 'v1', age: 1 }));

    // Method 2  update only values within an individual form group without affecting the other properties.
    //const formArrayObj = this.studentsFA.at(0) //get control instance from index 0.
    //formArrayObj.patchValue({ name: 'v1', age: 1 })





    //abc.patchValue(obj)
    // Resets the values of all controls to null
    this.studentsFA.reset();

    // Reset with custom values.


    // set object at every index of formArray
    for (let i = 0; i < this.studentsFA.length; i++) {
      this.studentsFA.setControl(i, this._fb.group({ name: 'v2', age: 2 }));
    }


    // const myObj = { name: 'v2', age: 2 };
    // const rawObj = this.studentsFA.getRawValue();
    // this.studentsFA.length.forEach((x, i) => {
    //   const objFA = this.studentsFA.at(i)
    //   objFA.patchValue(myObj)
    // })


  }

  onSave(obj: FormGroup) {
    debugger

    const obj2 = {
      name: 'Asif',
      age: 1
    }
  }
}
