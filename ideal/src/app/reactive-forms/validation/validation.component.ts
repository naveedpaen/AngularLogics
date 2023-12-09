import { Component } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ZeroIsInvalidAtStartValidator, phoneNumberValidator, synNoLeadingSpaceValidator } from '../validators/validators';
import { Observable, of } from 'rxjs';

import { Directive, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[logValue]'
})
export class LogValueDirective implements OnInit {
	@Input('logValue') value: any;
	ngOnInit() {
		console.log(this.value);
	}
}

@Component({
	selector: 'app-validation',
	templateUrl: './validation.component.html',
	styleUrls: ['./validation.component.css']
})
export class ValidationComponent {
	stuFG!: FormGroup;
	//public loginform!: FormGroup;

	loginform = this._fb.group({
		email: [
			'',
			{
				validators: [Validators.required, Validators.email]
			}
		],
		password: ['', [Validators.required, Validators.minLength(8)]]
	});

	showNameHint!: boolean;
	editObj = {
		name: 'Zeeshan',
		age: '13',
		gender: 'male',
		address: { country: 'Pakistan', city: '1' },
		sports: { cricket: true, football: false, other: false },
		courses: [
			{ courseName: 'Urdu', teacherName: 'Sir Asif' },
			{ courseName: 'Arabic', teacherName: 'Sir Ahmad' }
		]
	};

	constructor(private _fb: NonNullableFormBuilder) {}

	ngOnInit(): void {
		// define formGroup in ngonit to use validation methods of this component
		// if define above constructor, then intellisence (type-safety) will work. (Angular 14 functionality)
		this.createDefaultFG();

		this.loginform.value.email;
	}

	CreateFG() {}

	// set default or add new empty.
	createDefaultFG() {
		const controlOptions: AbstractControlOptions = {
			validators: [Validators.required, this.syncNoLeadingSpaceValidator],
			asyncValidators: [this.asyncNoLeadingSpaceValidator],
			updateOn: 'change'
		};

		// this.stuFG = this._fb.group({
		// 	name: ['', Validators.required, this.syncNoLeadingSpaceValidator, 'change'],
		// 	name2: ['', controlOptions],
		// 	age: ['', [Validators.required, Validators.min(1), Validators.max(18), Validators.minLength(2), Validators.pattern('^[0-9]+$'), ZeroIsInvalidAtStartValidator, phoneNumberValidator]],
		// 	gender: ['male'],
		// 	sports: this._fb.group({ cricket: false, football: false, other: false }, { validators: this.atLeastOneOptionSelectedValidator }),
		// 	address: this._fb.group({
		// 		country: ['', Validators.required],
		// 		city: ['', [Validators.required], [this.asyncNoLeadingSpaceValidator]]
		// 	}),
		// 	courses: this._fb.array([])
		// });

		// this.stuFG = new FormGroup({
		// 	name: new FormControl('', Validators.required, this.syncNoLeadingSpaceValidator,  ),
		// 	name2: new FormControl('', controlOptions),
		// 	age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(18), Validators.minLength(2), Validators.pattern('^[0-9]+$'), ZeroIsInvalidAtStartValidator, phoneNumberValidator]),
		// 	gender: new FormControl('male'),
		// 	sports: new FormGroup({ cricket: new FormControl(false), football: new FormControl(false), other: new FormControl(false) }, { validators: this.atLeastOneOptionSelectedValidator }),
		// 	address: new FormGroup({
		// 	  country: new FormControl('', Validators.required),
		// 	  city: new FormControl('', [Validators.required], [this.asyncNoLeadingSpaceValidator])
		// 	}),
		// 	courses: new FormArray([])
		//   });

		this.stuFG = new FormGroup({
			name: new FormControl('', [Validators.required, this.syncNoLeadingSpaceValidator], [this.asyncNoLeadingSpaceValidator]),
			name2: new FormControl('', controlOptions),
			age: new FormControl('', [
				Validators.required,
				Validators.min(1),
				Validators.max(18),
				Validators.minLength(2),
				Validators.pattern('^[0-9]+$'),
				ZeroIsInvalidAtStartValidator,
				phoneNumberValidator
			]),
			gender: new FormControl('male'),
			sports: new FormGroup(
				{
					cricket: new FormControl(false),
					football: new FormControl(false),
					other: new FormControl(false)
				},
				{ validators: this.atLeastOneOptionSelectedValidator }
			),
			address: new FormGroup({
				country: new FormControl('', Validators.required),
				city: new FormControl('', [Validators.required], [this.asyncNoLeadingSpaceValidator])
			}),
			courses: this._fb.array([])
		});

		// const userForm11 = new FormGroup({
		// 	name: new FormControl('', [Validators.required], [this.asyncNoLeadingSpaceValidator])
		// });
	}

	// doesnot changes the form structure (number of fields) or validation states.
	// just update values.
	updateFG() {
		this.stuFG.patchValue({
			name: 'def name',
			age: 1,
			address: { city: 'def city' }
		});

		const list = [
			{ courseName: 'c-name1', teacherName: 't-name1' },
			{ courseName: 'c-name2', teacherName: 't-name2' },
			{ courseName: 'c-name3', teacherName: 't-name3' }
		];

		const coursesArray: FormArray = this.stuFG.get('courses') as FormArray;

		list.forEach((item, index) => {
			if (index < coursesArray.length) {
				const existingFormGroup = coursesArray.at(index) as FormGroup;
				existingFormGroup.patchValue(item);
			} else {
				coursesArray.push(this._fb.group(item));
			}
		});

		// remove extra objects
		while (coursesArray.length > list.length) {
			coursesArray.removeAt(coursesArray.length - 1);
		}
	}

	//if you want to create a new form group with the updated values and do not need to retain any existing data or state then best is below,
	// also better if the new data has additional fields or different validation rules compared to the existing form group,
	//  a completely new instance of the form group is created with the updated values and new validations.
	editFG() {
		this.stuFG = this._fb.group({
			name: [this.editObj.name, [Validators.required, this.syncNoLeadingSpaceValidator], [this.asyncNoLeadingSpaceValidator]],
			age: [
				this.editObj.age,
				[Validators.required, Validators.min(1), Validators.max(18), Validators.minLength(2), Validators.pattern('^[0-9]+$'), ZeroIsInvalidAtStartValidator, phoneNumberValidator]
			],
			gender: this.editObj.gender,
			sports: this._fb.group(
				{
					cricket: this.editObj.sports.cricket,
					football: this.editObj.sports.football,
					other: this.editObj.sports.other
				},
				{ validators: this.atLeastOneOptionSelectedValidator }
			),
			address: this._fb.group({
				country: [this.editObj.address.country, Validators.required],
				city: [this.editObj.address.city, [Validators.required], [this.asyncNoLeadingSpaceValidator]]
			}),
			courses: this._fb.array(this.getCourses())
		});
	}

	getCourses(): FormGroup[] {
		return this.editObj.courses.map(x => this._fb.group({ courseName: x.courseName, teacherName: x.teacherName }));
	}

	atLeastOneOptionSelectedValidator: ValidatorFn = (currentFormGroup: AbstractControl): { [key: string]: any } | null => {
		debugger;
		const cricketSelected = currentFormGroup.get('cricket')?.value;
		const footballSelected = currentFormGroup.get('football')?.value;
		const otherSelected = currentFormGroup.get('other')?.value;

		return cricketSelected || footballSelected || otherSelected ? null : { atLeastOneOptionRequired: true };
	};

	syncNoLeadingSpaceValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
		const value = control.value;
		if (typeof value === 'string' && value.trim() !== value) {
			return { leadingSpace: true, value: value };
		}
		return null;
	};

	presenceValidator() {
		return (control: FormControl) => {
			const value = control.value;
			if (value === null || value === undefined || value === '') {
				return { required: true };
			}
			return null;
		};
	}

	asyncNoLeadingSpaceValidator(control: AbstractControl): Observable<ValidationErrors | null> {
		const value = control.value;
		debugger;
		if (typeof value === 'string' && value.trim() !== value) {
			return of({ asyncNoLeadingSpace: true, value: value });
		}
		return of(null);
	}

	resetForm() {
		debugger;
		this.stuFG;
		this.stuFG.reset();
	}

	clearForm() {
		this.courses.clear();
	}

	onSave(fg: FormGroup) {
		debugger;
	}

	addDefaultCourseObj(): FormGroup {
		return this._fb.group({ courseName: '', teacherName: '' });
	}

	addCourse() {
		this.courses.push(this.addDefaultCourseObj());
	}

	insert() {
		this.courses.insert(0, this._fb.group({ courseName: '', teacherName: '' }));
	}

	get courses(): FormArray {
		return this.stuFG.get('courses') as FormArray;
	}

	getCourseFGFromIndex(index: number): FormGroup {
		return this.courses.controls[index] as FormGroup;
	}

	getCourseFC(index: number): FormControl {
		return this.getCourseFGFromIndex(index).controls['courseName'] as FormControl;
	}

	//next
	// getCourseFC51(index: number): FormControl {
	//   return (<FormArray>this.stuFG['courses']).controls[index].controls[
	//     'courseName'
	//   ] as FormControl;
	// }

	getCourseFC2(index: number): FormControl {
		return this.getCourseFGFromIndex(index).get('courseName') as FormControl;
	}

	getCourseFC3(index: number): FormGroup {
		return <FormGroup>(<FormArray>this.stuFG.get('courses')).controls[index];
	}

	getCourseFC5(index: string): FormControl {
		return <FormControl>(<FormGroup>(<FormArray>this.stuFG.get('courses')).get(index)).get('courseName');
	}

	// -------------------  FormControl   ---------------------------------------------
	// FormControl best 1
	get city4(): FormControl {
		return this.stuFG.get('address')?.get('city') as FormControl;
	}

	// FormControl best 2 (not using consistantly)
	get city(): FormControl {
		return this.stuFG.get('address.city') as FormControl;
	}

	// FormControl best 3
	get city6(): FormGroup {
		return this.stuFG.get('address') as FormGroup;
	}
	get city7(): FormControl {
		return this.city6.get('city') as FormControl;
	}

	// FormControl best 4
	get city5(): FormControl {
		return this.stuFG.controls['address']?.get('city') as FormControl;
	}

	//--------------------------------------------------------------

	// -------------------  FormArray   ---------------------------------------------

	// best 1. useful in html too. <input [formControlName]="formGroup.get('list').get(String(0))">
	// https://stackoverflow.com/questions/40647073/angular-2-accessing-data-from-formarray
	getCOurseFC7(index: number): FormControl {
		return this.stuFG.get('courses')?.get(index.toString())?.get('courseName') as FormControl;
	}

	// best but not consistent
	getCOurseFC8(index: string): FormControl {
		return this.stuFG.get('courses.' + index)?.get('courseName') as FormControl;
	}

	// best 2
	getCourseFC4(index: number): FormControl {
		return <FormControl>(<FormGroup>(<FormArray>this.stuFG.get('courses')).controls[index]).get('courseName');
	}

	get sports(): FormGroup {
		return this.stuFG.get('sports') as FormGroup;
	}
	//--------------------------------------------------------------

	get city2(): AbstractControl {
		return this.stuFG.get(['address', 'city']) as FormControl;
	}

	get address(): FormGroup | null {
		return this.stuFG.controls['address'] as FormGroup;
	}

	get city3(): AbstractControl | null {
		return this.address?.controls['city'] as FormControl;
	}

	get name(): AbstractControl {
		return this.stuFG.controls['name'];
	}

	get name2(): AbstractControl {
		return this.stuFG.controls['name2'];
	}

	//  intellisense and nullish operator not needed in html.
	get age() {
		return this.stuFG.controls['age'];
	}

	// Method 2
	get age2() {
		return this.stuFG.get('age');
	}

	name3() {
		return this.stuFG.get('name');
	}

	check() {
		function classifyStudentPerformance(examScore: number, attendancePercentage: number, participationScore: number): string {
			let performanceCategory: string;

			switch (true) {
				case examScore >= 90 && attendancePercentage >= 80 && participationScore >= 90:
					performanceCategory = 'Excellent';
					break;

				case examScore >= 70 && attendancePercentage >= 70 && participationScore >= 70:
					performanceCategory = 'Good';
					break;

				case examScore >= 50 && attendancePercentage >= 60 && participationScore >= 50:
					performanceCategory = 'Satisfactory';
					break;

				default:
					performanceCategory = 'Needs Improvement';
			}

			return performanceCategory;
		}

		// Example usage
		const result = classifyStudentPerformance(85, 85, 88);
		console.log(result); // Outputs: Excellent
	}
}
