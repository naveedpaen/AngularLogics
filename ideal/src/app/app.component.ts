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

export type stuVM = {
	id: number;
	name: string;
	title: string;
	description: string;
	age2?: number;
};

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'my-app';

	constructor() {
		//const obj = { id: 1, name: 'asif' };
		debugger;
		let obj = { a: 'apple', b: 'banana', c: 'cherry', d: { e: { p: { r: 1 } } } };
		const res2s = this.hasKeyAtAnyLevel(obj, 'r');
		const res = this.checkNestedPropertyExist(obj, 'e');

		const abc = 'e' in obj;
		const f = Object.hasOwn(obj, 'e');
		const d = obj.hasOwnProperty('e');

		//this.logObjectProperties(obj);

		interface OuterObject {
			a: string;
			b: {
				c: number;
				d: string;
			};
		}
	}

	studentsList = [
		{ id: 1, name: 'Asif', title: 'Sindh', description: 'living in Karachi', age: 14 },
		{ id: 2, name: 'Naveed Ullah', title: 'khan', description: 'living in lahore' },
		{ id: 3, name: 'Ali', title: 'KPK', description: 'living in Peshawar' }
	];
	async ngOnInit() {
		this.studentsList.forEach((x: stuVM) => {
			if (x.age2 == 14) {
			}
		});

		this.objects();
		// debugger;
		// const source$ = interval(1000).pipe(take(10));
		// source$.subscribe((res) => console.log(res));
		// const finalNumber = await lastValueFrom(source$);
		// console.log(`The final number is ${finalNumber}`);
	}

	logObjectProperties(obj: any, indent: string = ''): void {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const value = obj[key];
				if (typeof value === 'object' && value !== null) {
					console.log(`${indent}${key}:`);
					this.logObjectProperties(value, `${indent}  `);
				} else {
					console.log(`${indent}${key}: ${value}`);
				}
			}
		}
	}

	checkNestedPropertyExist(obj: any, indent: string = ''): boolean {
		for (const key in obj) {
			if (Object.hasOwn(obj, key)) {
				const value = obj[key];
				if (typeof value === 'object' && value !== null) {
					console.log(`${indent}${key}:`);
					this.checkNestedPropertyExist(value, `${indent}  `);
					if (Object.hasOwn(value, indent)) {
						return true;
					}
				} else {
					console.log(`${indent}${key}: ${value}`);
				}
			}
		}
		return false;
	}

	calculation() {
		const myNumber: number[] = [2, 3, 4, 5, 6];
		for (let index = 1; index < myNumber.length; index = index + 2) {
			console.log(myNumber[index]);
		}
	}

	getValuesByKeys(keys: string[], obj: any): any {
		const newObj: any = {};

		keys.forEach(key => {
			if (Object.hasOwn(obj, key)) {
				newObj[key] = obj[key];
			}
		});

		return newObj;
	}

	hasKeyAtAnyLevel(obj: Record<string, any>, keyToFind: string): boolean {
		for (const key in obj) {
			if (key === keyToFind) {
				return true;
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				if (this.hasKeyAtAnyLevel(obj[key], keyToFind)) {
					return true;
				}
			}
		}
		return false;
	}

	objects() {
		const obj1 = { a: 1 };
		const obj2 = { b: 2 };
		const obj3 = { c: 3 };
		const mergedObject = Object.assign({ z: 26 }, obj1, obj2, obj3);

		const keys: string[] = ['id', 'name'];
		let obj: any = { id: 1, name: 'asif', class: 2 };
		let newObj = this.getValuesByKeys(keys, obj);

		Object.keys({ id: 1, name: 'khan' }).length;

		Object.hasOwn;

		// let newObj: any = {};
		// keys.forEach(key => {
		// 	if (obj1.hasOwnProperty(key)) {
		// 		newObj[key] = obj1[key];
		// 	}
		// });

		//let obj = { a: 'apple', b: 'banana', c: 'cherry' };

		console.log(obj.hasOwnProperty('a')); // true
		console.log(obj.hasOwnProperty('d')); // false
		// Custom type
		let stu1: { id?: number; name?: string } = {};
		stu1 = { id: 1, name: 'asif' };

		const keys2 = Object.keys({ id: 1, 123: 123, Name: 'asif', address: { country: 'Pakistan', city: 'Lahore' } });

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
