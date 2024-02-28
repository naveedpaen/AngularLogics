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
					<li><a (click)="test()">test</a></li>
				</ul>
			</nav>
		</header> `,
	styleUrls: ['./header.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	age = 10;
	constructor(private _sharedService: ShareService) {}
	mySub!: Subscription;
	method = (a: number, b: number, c: number) => a * b * c;
	me2 = (a: number, b: number, c: number) => {
		a * b * c;
	};

	ngOnInit() {
		this.method(1, 2, 3);

		this.mySub = this._sharedService.subject.subscribe(res => {});
	}
	myMethod() {
		this._sharedService.subject.next(1);
	}

	unsubscribe() {
		this.mySub.unsubscribe();
		//this._sharedService.subject.unsubscribe();
	}

	test() {
		debugger;
		const calculateArea: (width: number, height: number) => number = (width, height) => width * height;
		const area = calculateArea(10, 5); // area will be 50

		const multiply = function (a: number, b: number): number {
			console.log();
			return a * b;
		};

		const d = (a: number): number => {
			this.age;
			console.log();
			console.log();
			return 5;
		};

		(a: number): number => a * 2;
		(a: number) => a * 2;
		(a: number) => a;

		d(1);
		multiply(1, 2);
	}
}
