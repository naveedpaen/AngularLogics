import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
interface PersonTemplateContext {
	$implicit: any; // Assuming any for simplicity; replace with the actual type of your 'people' array elements
	index: number;
}
@Component({
	selector: 'app-parent',
	standalone: true,
	imports: [CommonModule, ChildComponent, FormsModule, ReactiveFormsModule],
	template: `<p>parent works!</p>

		<form [formGroup]="userForm" (submit)="onSave(userForm)">
			<label>First name:</label><br />

			<div class="row">
				<div class="col-md-6">
					<label for="name" class="form-label">Name</label>
					<input type="text" id="name" class="form-control" formControlName="name" />
				</div>
			</div>

			<app-child [age]="userForm.get('age')" [id]="1" [name]="'asif'"> </app-child>
		</form>
		<hr />

		<div *ngFor="let person of people; let i = index">
			<ng-container *ngTemplateOutlet="personTemplate; context: { $implicit: person, mobileNo: '0303', index: i }"></ng-container>
		</div>

		<ng-template #personTemplate let-implicit let-phone="mobileNo" let-index="index" let-implicit2>
			<div>
				<p>phone {{ phone }}</p>
				<p>index {{ index }}</p>
				<p>Name: {{ implicit2.name }}</p>
				<p>Age: {{ implicit2.age }}</p>
			</div>
		</ng-template>

		<hr /> `,
	styleUrls: ['./parent.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
	userForm: FormGroup = new FormGroup({
		name: new FormControl(''),
		age: new FormControl('')
	});

	people: any[] = [
		{ name: 'Asif', age: 25 },
		{ name: 'Ali', age: 30 }
	];

	onSave(arg0: FormGroup<any>) {
		const a = this.userForm.get('name');
		const a3 = this.userForm.get('age');
		throw new Error('Method not implemented.');
	}
}
