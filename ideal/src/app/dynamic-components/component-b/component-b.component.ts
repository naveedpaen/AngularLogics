import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-component-b',
	standalone: true,
	imports: [NgComponentOutlet, AsyncPipe, CommonModule],
	templateUrl: './component-b.component.html',
	styleUrls: ['./component-b.component.css']
})
export class ComponentBComponent {}
