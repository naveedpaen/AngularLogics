import { Injectable } from '@angular/core';
import { ControlBase } from './control-base';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
interface Group {
	// [key: string]: FormControl | FormGroup | FormArray ;
	[key: string]: any;
}
@Injectable({
	providedIn: 'root'
})
export class LogicService {
	/**
	 *
	 */
	constructor(private _fb: FormBuilder) {}
	createFormGroup(student: ControlBase<string>[]) {
		const group: Group = {};
		student.forEach(({ key, required, value, controlType, options }) => {
			if (controlType == 'checkbox') {
				const formGroup = this._fb.group({
					sports: this._fb.array([]) // Initialize as an empty array
				});

				const formArray = formGroup.get('sports') as FormArray;

				//const formGroup = { sport: this._fb.array([]) };
				options.forEach(option => {
					formArray.push(new FormControl(value ?? '')); // Initialize all checkboxes as unchecked
				});
				group[key] = formGroup;
			} else {
				group[key] = required ? new FormControl(value ?? '', Validators.required) : new FormControl(value ?? '');
			}
		});
		return new FormGroup(group);
	}
}
