import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './reactive-forms/reactive/reactive.component';
import { AddComponent } from './reactive-forms/add/add.component';
import { GroupComponent } from './reactive-forms/group/group.component';
import { ValidationComponent } from './reactive-forms/validation/validation.component';
import { StudentComponent } from './dynamic/student/student.component';
import { StaticControlsComponent } from './dynamic/static-controls/static-controls.component';
import { ReactiveSampleComponent } from './reactive-forms/reactive-sample/reactive-sample.component';
import { TestComponent } from './test/test.component';
import { Parent1Component } from './parent-child/parent1/parent1.component';

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
	},
	{
		path: 'parent',
		component: Parent1Component
	},
	{
		path: 'test',
		component: TestComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
