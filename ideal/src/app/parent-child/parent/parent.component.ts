import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
interface PersonTemplateContext {
	$implicit: any; // Assuming any for simplicity; replace with the actual type of your 'people' array elements
	index: number;
}
@Component({
	selector: 'app-parent',
	standalone: true,
	imports: [CommonModule, ChildComponent],
	template: `<p>parent works!</p>

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

		<hr />
		<app-child [id]="1" [name]="'asif'"> </app-child> `,
	styleUrls: ['./parent.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
	people: any[] = [
		{ name: 'Asif', age: 25 },
		{ name: 'Ali', age: 30 }
	];
}
