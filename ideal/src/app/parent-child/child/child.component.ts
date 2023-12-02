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
		</ng-template> `,
	styleUrls: ['./child.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
	@Input() id: number = 0;
	@Input() name: string = '';
}
