import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-test',
	standalone: true,
	imports: [CommonModule],
	template: `<p>test works!</p>`,
	styleUrls: ['./test.component.css']
})
export class TestComponent {}
