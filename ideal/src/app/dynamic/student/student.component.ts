import { DataService } from './../data.service';
import { LogicService } from './../logic.service';
import { Component, OnInit } from '@angular/core';
import { ControlBase } from '../control-base';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-student',
	templateUrl: './student.component.html',
	styleUrls: ['./student.component.css']
})
export class StudentComponent {
	controlsJson: ControlBase<string>[] | null = []; // is used in html file to create controls. number, order, type, label, of Control.
	form!: FormGroup; // is used in ts file.
	studentId!: number;
	studentData!: { name: string; age: string };

	//formGroup!: FormGroup;
	// Add case :  create FormControls with help of ControlsJson, assign default values of ControlsJson.
	// Edit case;  create FormControls with help of ControlsJson, assign db values.
	constructor(private _dataService: DataService, private _logicService: LogicService, private _activatedRoute: ActivatedRoute, private _router: Router, private _fb: FormBuilder) {}

	ngOnInit() {
		debugger;
		let formGroup: FormGroup = new FormGroup({});
		formGroup.addControl('formControlName', new FormControl('value'));

		let formGroup2: FormGroup;
		formGroup2 = new FormGroup({ formControlName2: new FormControl('value') });

		let formGroup3: FormGroup = new FormGroup({ formControlName3: new FormControl(), formControlName4: new FormControl() });
		let forgroup4 = this._fb.group(new FormControl('abc'));
		let forgroup5 = this._fb.group({ name: '' });
		let FormGroup6 = this._fb.group({ f1: this._fb.group(new FormControl('')) });

		// formGroup3 = new FormGroup({ formControlName3: new FormControl('value') });

		// addControl adds FormControl, FormGroup and FormArray in existing FormGroup. while with new keyword new FormControl, FormGroup and FormArray is added.

		// let formGroup2: FormGroup;
		// formGroup2.addControl('formControlName', new FormControl('value'));
		// formGroup = new FormGroup({ formControlName2: new FormControl('value') });

		// let formArrayObj : FormArray = new FormArray([]);
		// formArrayObj.push(new FormGroup({ controlName1: new FormControl('value'), controlName2: new FormControl('value2') }), new FormGroup({ controlName1: new FormControl('value'), controlName2: new FormControl('value2') }))

		// const obj3 = this._fb.array( { formControl1: this._fb.control('value'), formCOntrol2: this._fb.control('value2')});
		const obj4 = this._fb.array([this._fb.group([this._fb.control('value'), this._fb.control('value2')])]);

		const obj = {
			//FormContro
			formControl1: new FormControl('value'),
			formControl1_fb: this._fb.control('value'),

			// FormGroup
			formGoupName0: new FormGroup({}),
			formGroupName1: new FormGroup({ controlName1: new FormControl('value'), controlName2: new FormControl('value2') }),
			formGroupName2: new FormGroup({ controlName: new FormControl('value'), formGroupName: new FormGroup({ controlName1: new FormControl('value') }), formArrayName: new FormArray([new FormControl('value')]) }),
			formGroupName3: new FormGroup([new FormControl('value'), new FormControl('value2')]),

			formGoupName0_fb: this._fb.group({}),
			formGroupName1a_fb: this._fb.group({ controlName1: this._fb.control('value1'), controlName2: this._fb.control('value2') }),
			formGroupName1b_fb: this._fb.group({ controlName1: 'value1', controlName2: 'value2' }),
			formGroupName2_fb: this._fb.group({ ControlName: this._fb.control('value'), formGroupName: this._fb.group(this._fb.control('value')), formArrayName: this._fb.array([this._fb.group('value')]) }),
			formGroupName3_fb: this._fb.group([this._fb.control('value'), this._fb.control('value2')]),

			// FormArray
			formArrayName1: new FormArray([]),
			formArrayName2: new FormArray([new FormControl('value'), new FormControl('value2')]),
			formArrayName3: new FormArray([new FormGroup({ controlName1: new FormControl('value') }), new FormGroup({ controlName1: new FormControl('value') })]),
			formArrayName4: new FormArray([new FormArray([new FormControl('value'), new FormControl('value2')]), new FormArray([new FormControl('value'), new FormControl('value2')])]),
			formArrayName5: new FormArray([new FormControl('value2'), new FormGroup({ formControlName: new FormControl('value') }), new FormArray([new FormControl('value')])]),

			formArrayName1_fb: this._fb.array([]),
			formArrayName2_fb: this._fb.array([this._fb.control('value'), this._fb.control('value2')]),
			formArrayName3_fb: this._fb.array([this._fb.group({ formControlName1: this._fb.control('value') }), this._fb.group({ formControlName1: this._fb.control('value') })]),
			formArrayName4_fb: this._fb.array([this._fb.array([this._fb.control('value')]), this._fb.array([this._fb.control('value')])]),
			formArrayName5_fb: this._fb.array([this._fb.control('value'), this._fb.group({ formControl1: this._fb.control('value') })], this._fb.array([this._fb.control('value')])),

			forGroup: new FormGroup({ formControlName: new FormControl('value', Validators.required) })
		};
		console.log(obj);

		this.studentId = +this._activatedRoute.snapshot.paramMap.get('id')!;

		if (this.studentId) {
			this.getControlsData();
		} else {
			this.getControlsJson();
		}
	}

	onSubmit() {
		debugger;
		console.log(this.form.value);

		const obj1 = {
			myFormControl: new FormControl('abc'),
			myFormGroup: new FormGroup({}),
			myFormArray: new FormArray([])
		};

		const obj2 = {
			myFormControl: this._fb.control('value'),
			myFormGroup: this._fb.group({}),
			myFormArray: this._fb.array([])
		};
	}

	onEditClick() {
		// step 1: get Controls Json from db.
		// step 2: get db values and assign to controls json.
		// step 3: create formcontrols with help of controls json.
		// step 4: create html controls with help of controls json.
		this._router.navigate(['../student/3']);
	}

	updateControlValues(controlsJson: ControlBase<string>[], studentObj: { [key: string]: string }): ControlBase<string>[] {
		controlsJson?.forEach((x: ControlBase<string>) => {
			if (studentObj.hasOwnProperty(x.key)) {
				x.value = studentObj[x.key];
			}
		});
		return controlsJson;
	}

	getControlsJson() {
		this._dataService.getStudentControlsJson().subscribe(res => {
			this.controlsJson = res;

			if (this.studentId && this.studentData) {
				this.controlsJson = this.updateControlValues(this.controlsJson, this.studentData);
			}

			this.form = this._logicService.createFormGroup(this.controlsJson);
		});
	}

	getControlsData() {
		this.studentData = this._dataService.getStudentData();
		this.getControlsJson();
	}

	onAddClick() {
		// step 1: get controls json from db.
		// step 2. create form with help of ControlsJson.
		// step 3. create html controls with help of ControlsJson.
		this._router.navigate(['../student']);
		this.getControlsJson();
	}
}
