import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.css']
})
export class GroupComponent {
	stuFG = this._fb.group({
		name: '',
		age: 0,
		address: this._fb.group({ city: '' }),
		courses: this._fb.array([this._fb.group({ courseName: 'def c-name', teacherName: 'def t-name' })])
	});
	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {}

	setDefault() {
		// set Formgroup controls.
		this.stuFG.patchValue({
			name: 'def name',
			age: 1,
			address: { city: 'def city' }
		});

		const obj = [{ courseName: 'def c-name', teacherName: 'def t-name' }];

		// set FormArray controls.
		obj.forEach((item, i) => {
			this.courses.setControl(i, this._fb.group(item));
		});
	}

	edit() {
		this.stuFG.patchValue({
			name: 'def name',
			age: 1,
			address: { city: 'def city' }
		});

		const obj = [
			{ courseName: 'c-name1', teacherName: 't-name1' },
			{ courseName: 'c-name2', teacherName: 't-name2' },
			{ courseName: 'c-name3', teacherName: 't-name3' }
		];
		obj.forEach((item, i) => {
			this.courses.setControl(i, this._fb.group(item));
		});
	}

	resetForm() {
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
}
