import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ZeroIsInvalidAtStartValidator, atLeastOneOptionSelectedValidator, phoneNumberValidator, synNoLeadingSpaceValidator } from './../../validators/validators';

@Component({
	selector: 'app-reactive-sample',
	templateUrl: './reactive-sample.component.html',
	styleUrls: ['./reactive-sample.component.css']
})
export class ReactiveSampleComponent {
	stuFG2: FormGroup = new FormGroup({
		name: new FormControl(''),
		fatherName: new FormControl('', [Validators.required, synNoLeadingSpaceValidator]),
		age: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(10)]),
		gender: new FormControl('male'),
		sports: new FormGroup({ cricket: new FormControl(false), football: new FormControl(false), other: new FormControl(false) }, { validators: atLeastOneOptionSelectedValidator })
	});

	stuFG: FormGroup = this._fb.group({ name: '', fatherName: ['', Validators.required, synNoLeadingSpaceValidator], age: [0, Validators.min(1), Validators.max(10)], gender: 'male', sports: this._fb.group({ cricket: false, football: false, other: false }, { validators: atLeastOneOptionSelectedValidator }) });

	constructor(private _fb: FormBuilder) {}

	onSubmit(form: FormGroup) {
		debugger;
	}

	get sports(): FormGroup {
		return this.stuFG.get('sports') as FormGroup;
	}
	get age() {
		return this.stuFG.controls['age'];
	}

	get name(): AbstractControl {
		return this.stuFG.controls['name'];
	}

	get fatherName(): AbstractControl {
		return this.stuFG.controls['fatherName'];
	}
}
