import { Injectable } from '@angular/core';
import { Checkbox, ControlBase, Radio, Select, TextBox } from './control-base';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	getStudentControlsJson() {
		const student: ControlBase<string>[] = [
			new TextBox({
				key: 'name',
				value: '',
				required: true,
				label: 'Student Name',
				order: 1,
				controlType: 'textbox', // not needed as already assigned value in child class.
				type: 'text'
			}),

			new TextBox({
				key: 'age',
				value: '',
				required: true,
				label: 'Age',
				order: 2,
				controlType: 'textbox',
				type: 'number'
			}),
			new Select({
				key: 'country',
				value: '',
				required: true,
				label: 'Country',
				order: 3,
				controlType: 'select',
				type: 'number',
				options: [
					{ key: '1', value: 'Pakistan' },
					{ key: '2', value: 'UAE' }
				]
			}),
			new Radio({
				key: 'gender',
				value: '',
				required: true,
				label: 'Please select gender',
				order: 4,
				controlType: 'radio',
				type: 'string',
				options: [
					{ key: 'Male', value: 'male' },
					{ key: 'Female', value: 'female' },
					{ key: 'Other', value: 'other' }
				]
			}),
			new Checkbox({
				key: 'sport',
				value: '',
				required: true,
				label: 'Please select Favourite sports',
				order: 5,
				controlType: 'checkbox',
				type: 'string',
				options: [
					{ key: 'Cricket', value: 'cricket' },
					{ key: 'Football', value: 'football;' },
					{ key: 'Other', value: 'other' }
				]
			})

			// new Radio({
			// 	key: 'gender',
			// 	value: 'Male',
			// 	required: true,
			// 	label: 'Male',
			// 	order: 4,
			// 	controlType: 'radio',
			// 	type: 'string'
			// }),
			// new Radio({
			// 	key: 'gender',
			// 	value: 'Female',
			// 	required: true,
			// 	label: 'Female',
			// 	order: 5,
			// 	controlType: 'radio',
			// 	type: 'string'
			// })
		];

		return of(student.sort((a, b) => a.order - b.order));
	}

	getStudentData(): { name: string; age: string; country: string } {
		return { name: 'Ahmad', age: '20', country: '1' };
	}
}
