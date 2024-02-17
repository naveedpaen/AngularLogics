import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
				</ul>
			</nav>
		</header> `,
	styleUrls: ['./header.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
