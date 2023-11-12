import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from '../control-base';

@Component({
	selector: 'app-dynamic-controls',
	templateUrl: './dynamic-controls.component.html',
	styleUrls: ['./dynamic-controls.component.css']
})
export class DynamicControlsComponent {
	@Input() control!: ControlBase<string>;
	@Input() form!: FormGroup;

	ngOnChanges(changes: SimpleChanges) {
		if (changes['control']?.currentValue) {
		}
	}
}
