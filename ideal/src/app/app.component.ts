import { Number } from './dynamic/control-base';
import { Component } from '@angular/core';
import { interval, lastValueFrom, take } from 'rxjs';

export interface abc {
	id: number | string;
}

export class StudentVM3 {
	id?: number;
	name?: string;
}

export interface StudentVM4 {
	id?: number;
	name?: string;
}

export type StudentVM5 = {
	id?: number;
	name?: string;
};

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'my-app';

	constructor() {
		// this.calculation();

		let obj = {
			key1: 'value1', //scalar value
			key2: function () {
				console.log('functions');
			},
			key4: [1, 2, 3] //collection
		};
	}

	async ngOnInit() {
		this.objects();
		// debugger;
		// const source$ = interval(1000).pipe(take(10));
		// source$.subscribe((res) => console.log(res));
		// const finalNumber = await lastValueFrom(source$);
		// console.log(`The final number is ${finalNumber}`);
	}

	calculation() {
		const myNumber: number[] = [2, 3, 4, 5, 6];
		for (let index = 1; index < myNumber.length; index = index + 2) {
			console.log(myNumber[index]);
		}
	}

	objects() {
		debugger;

		// Custom type
		let stu1: { id?: number; name?: string } = {};
		stu1 = { id: 1, name: 'asif' };

		const keys = Object.keys({ id: 1, 123: 123, Name: 'asif', address: { country: 'Pakistan', city: 'Lahore' } });

		const abc = Object.keys([1, 2, 3]);

		// Record signature
		let stu2: Record<string, string | number> = {};
		stu2['id'] = 1;
		stu2['name'] = 'asif';
		stu2 = { id: 2, name: 'a' };
		//Property comes from an index signature, so it must be accessed with index signature.

		// index signature
		let stu3: { [key: string]: string | number } = {};
		stu3['id'] = 1;
		stu3['name'] = 'asif';
		stu3 = { id: 2, name: 'a' };
		// Property comes from an index signature, so it must be accessed with index signature.

		// Type with record signature
		type StudentVM1 = Record<string, string | number>;
		let stu4: StudentVM1 = {};
		stu4['id'] = 1;
		stu4['name'] = 1;
		stu4 = { id: 2, name: 'a' };

		// type with index signature
		type StudentVM2 = { [key: string]: string | number };
		const stu5: StudentVM2 = {};
		stu5['id'] = 1;
		stu5['name'] = 1;

		// Class
		let obj6: StudentVM3 = {};
		obj6 = { id: 1, name: 'asif' };

		// Interface
		let obj7: StudentVM4 = {};
		obj7 = { id: 1, name: 'asif' };

		// type
		let obj8: StudentVM5 = {};
		obj8 = { id: 1, name: 'asif' };
	}
}
