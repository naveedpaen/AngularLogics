import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Child1Component } from '../child1/child1.component';

@Component({
	selector: 'app-parent1',
	standalone: true,
	imports: [CommonModule, Child1Component, FormsModule, ReactiveFormsModule],
	templateUrl: './parent1.component.html',
	styleUrls: ['./parent1.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Parent1Component {
	userForm!: FormGroup;
	ageControl!: FormControl;
	myAge: number = 5;
	myObj!: { id: number; name: string };
	counter = 0;
	parentCounter = 0;

	ngOnInit() {
		const abc = { id: 1, name: 'asif' };
		abc.id = 3;
		debugger;
		const person = {
			name: 'Alice',
			age: 30
		};
		//Object.freeze(person);

		person.age = 3;
		this.myObj = { id: 1, name: 'asif' };

		this.userForm = new FormGroup({
			name: new FormControl(''),
			age: new FormControl(''),
			list: new FormArray([])
		});
		this.ageControl = this.userForm.get('age') as FormControl;

		// setInterval(() => {
		// 	this.counter++;
		// 	//this.cdr.markForCheck(); // Manually mark for check to trigger change detection
		// }, 2000);
	}

	people: any[] = [
		{ name: 'Asif', age: 25 },
		{ name: 'Ali', age: 30 }
	];

	onSave(arg0: FormGroup<any>) {
		debugger;
		//const a = this.userForm.get('name');
		//const a3 = this.userForm.get('age');
		throw new Error('Method not implemented.');
	}

	addAge() {
		this.myObj.name = 'Bilal';
		this.myObj.id = this.myObj.id + 1;

		this.myObj = { id: 3, name: 'Naveed' };
		// this.myAge++;
	}

	addCounter() {
		// this.counter++;
		this.parentCounter++;
	}
}
