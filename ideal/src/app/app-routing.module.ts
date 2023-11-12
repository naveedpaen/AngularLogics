import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './reactive/reactive/reactive.component';
import { AddComponent } from './add/add.component';
import { GroupComponent } from './group/group.component';
import { ValidationComponent } from './validation/validation.component';
import { StudentComponent } from './dynamic/student/student.component';
import { StaticControlsComponent } from './dynamic/static-controls/static-controls.component';
import { ReactiveSampleComponent } from './reactive-forms/reactive-sample/reactive-sample.component';

const routes: Routes = [
	{
		path: 'react',
		component: ReactiveComponent
	},
	{
		path: 'add',
		component: AddComponent
	},
	{
		path: 'group',
		component: GroupComponent
	},
	{
		path: 'valid',
		component: ValidationComponent
	},
	{
		path: 'student',
		component: StudentComponent
	},
	{
		path: 'student/:id',
		component: StudentComponent
	},
	{
		path: 'static',
		component: StaticControlsComponent
	},
	{
		path: 'sample',
		component: ReactiveSampleComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
