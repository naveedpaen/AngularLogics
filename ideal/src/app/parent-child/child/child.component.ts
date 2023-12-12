import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-child',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	template: `<p>child works!</p>
		<div>{{ age.value }}</div>

		<div class="col-md-6">
			<label>age:</label><br />
			<input type="number" id="lname" name="age" [formControl]="age" /><br />
		</div>
		<hr />
		<!-- ID : {{ id }} Name : {{ name }}

		<ng-template let-a let-id>
			<span> Id: {{ id }}</span>
			<span>{{ a }}</span> <br />
		</ng-template> -->

		<!-- Dashboard Component Template -->
		<!-- <div *ngFor="let widget of dashboardWidgets; let index = index">
			<ng-container *ngTemplateOutlet="widget?.template; context: { $implicit: widget.data, index: index }"></ng-container>
		</div>


		<ng-template #temperatureWidget let-data let-index="index">
			<div>
				<p>Widget {{ index + 1 }}</p>
				<p>Temperature: {{ data.temperature }}</p>

			</div>
		</ng-template>

		<ng-template #stockWidget let-data let-index="index">
			<div>
				<p>Widget {{ index + 1 }}</p>
				<p>Stock Symbol: {{ data.symbol }}</p>

			</div>
		</ng-template>

		<ng-template #currencyWidget let-data let-index="index">
			<div>
				<p>Widget {{ index + 1 }}</p>
				<p>Currency Code: {{ data.currencyCode }}</p>

			</div>
		</ng-template>

		<ng-template #newsWidget let-data let-index="index">
			<div>
				<p>Widget {{ index + 1 }}</p>
				<p>News Headline: {{ data.headline }}</p>

			</div>
		</ng-template>
		 --> `,
	styleUrls: ['./child.component.css']
})
export class ChildComponent {
	@Input() id: number = 0;
	@Input() name: string = '';
	@Input() age!: FormControl | any;
	dashboardWidgets: any[] = [];
	// dashboardWidgets object
}
