import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DynamicServiceService } from '../dynamic-service.service';

@Component({
	selector: 'app-parent',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './parent.component.html',
	styleUrls: ['./parent.component.css']
})
export class ParentComponent {
	private adList = inject(DynamicServiceService).getAds();

	private currentAdIndex = 0;

	get currentAd() {
		return this.adList[this.currentAdIndex];
	}

	displayNextAd() {
		this.currentAdIndex++;
		// Reset the current ad index back to `0` when we reach the end of an array.
		if (this.currentAdIndex === this.adList.length) {
			this.currentAdIndex = 0;
		}
	}
}
