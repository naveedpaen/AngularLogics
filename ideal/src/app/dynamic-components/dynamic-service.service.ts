import { Injectable, Type } from '@angular/core';
import { ComponentAComponent } from './component-a/component-a.component';
import { ComponentBComponent } from './component-b/component-b.component';

@Injectable({
	providedIn: 'root'
})
export class DynamicServiceService {
	constructor() {}
	getAds() {
		return [
			{
				component: ComponentAComponent,
				inputs: { name: 'Dr. IQ', bio: 'Smart as they come' }
			},
			{
				component: ComponentAComponent,
				inputs: { name: 'Bombasto', bio: 'Brave as they come' }
			},
			{
				component: ComponentBComponent,
				inputs: {
					headline: 'Hiring for several positions',
					body: 'Submit your resume today!'
				}
			},
			{
				component: ComponentBComponent,
				inputs: {
					headline: 'Openings in all departments',
					body: 'Apply today'
				}
			}
		] as { component: Type<any>; inputs: Record<string, unknown> }[];
	}
}
