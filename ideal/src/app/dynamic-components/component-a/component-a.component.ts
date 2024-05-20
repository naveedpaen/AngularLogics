import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-component-a',
	standalone: true,
	imports: [NgComponentOutlet, AsyncPipe, CommonModule],
	templateUrl: './component-a.component.html',
	styleUrls: ['./component-a.component.css']
})
export class ComponentAComponent {}
