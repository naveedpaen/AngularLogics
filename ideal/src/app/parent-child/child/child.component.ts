import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-child',
	standalone: true,
	imports: [CommonModule],
	template: `<p>child works!</p>
		ID : {{ id }} Name : {{ name }}

		<ng-template let-a let-id>
			<span> Id: {{ id }}</span>
			<span>{{ a }}</span> <br />
		</ng-template>

		<!-- Dashboard Component Template -->
		<div *ngFor="let widget of dashboardWidgets; let index = index">
			<ng-container *ngTemplateOutlet="widget?.template; context: { $implicit: widget.data, index: index }"></ng-container>
		</div>

		<!-- Dynamic Widget Templates -->
		<ng-template #temperatureWidget let-data let-index="index">
			<div>
				<p>Widget {{ index + 1 }}</p>
				<p>Temperature: {{ data.temperature }}</p>
				<!-- Additional widget-specific content -->
			</div>
		</ng-template>

		<ng-template #stockWidget let-data let-index="index">
			<div>
				<p>Widget {{ index + 1 }}</p>
				<p>Stock Symbol: {{ data.symbol }}</p>
				<!-- Additional widget-specific content -->
			</div>
		</ng-template>

		<ng-template #currencyWidget let-data let-index="index">
			<div>
				<p>Widget {{ index + 1 }}</p>
				<p>Currency Code: {{ data.currencyCode }}</p>
				<!-- Additional widget-specific content -->
			</div>
		</ng-template>

		<ng-template #newsWidget let-data let-index="index">
			<div>
				<p>Widget {{ index + 1 }}</p>
				<p>News Headline: {{ data.headline }}</p>
				<!-- Additional widget-specific content -->
			</div>
		</ng-template> `,
	styleUrls: ['./child.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
	@Input() id: number = 0;
	@Input() name: string = '';
	dashboardWidgets: any[] = [];
	// dashboardWidgets object
}
