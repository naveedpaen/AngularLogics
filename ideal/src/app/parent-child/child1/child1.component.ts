import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-child1',
	standalone: true,
	imports: [CommonModule, Child1Component, FormsModule, ReactiveFormsModule],
	templateUrl: './child1.component.html',
	styleUrls: ['./child1.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child1Component implements DoCheck, OnChanges, OnInit {
	@Input() myObj!: { id: number; name: string };
	@Input() id: number = 0;
	@Input() name: string = '';
	@Input() age!: FormControl | any;
	@Input() list!: FormArray | any;
	dashboardWidgets: any[] = [];
	changes!: SimpleChanges;
	// dashboardWidgets object

	//ngOnInit(): void {}

	@Input() counter = 0;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnChanges(changes: SimpleChanges) {
		this.changes = changes;
		if (changes['age']?.currentValue) {
			debugger;
		}
	}

	ngDoCheck(): void {
		this.changes;
		if (this.age) {
			this.age;
		}
	}

	ngOnInit() {
		// setInterval(() => {
		// 	//this.counter++;
		// 	// this.cdr.markForCheck(); // Manually mark for check to trigger change detection
		// }, 2000);
	}
}
