import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { ShareService } from 'src/app/share.service';

@Component({
	selector: 'app-header',
	template: `<!-- header.component.html -->

		<header>
			<div class="logo">
				<!-- Add your logo or brand name here -->
				<h1>Ideal</h1>
			</div>
			<nav>
				<ul>
					<!-- Add your navigation links here -->
					<li><a routerLink="/">Home</a></li>
					<li><a routerLink="/about">About</a></li>
					<li><a routerLink="/valid">Validation</a></li>
					<li><a (click)="myMethod()">next</a></li>
					<li><a (click)="unsubscribe()">unsubscribe</a></li>
				</ul>
			</nav>
		</header> `,
	styleUrls: ['./header.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	constructor(private _sharedService: ShareService) {}
	mySub!: Subscription;
	me = (a: number, b: number, c: number) => a * b * c;
	me2 = (a: number, b: number, c: number) => {
		a * b * c;
	};

	ngOnInit() {
		debugger;

		this.mySub = this._sharedService.subject.subscribe(res => {
			debugger;
		});
	}
	myMethod() {
		this._sharedService.subject.next(1);
	}

	unsubscribe() {
		this.mySub.unsubscribe();
		//this._sharedService.subject.unsubscribe();
	}
}
