import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Eager2Component } from './eager2/eager2.component';


const routes: Routes = [
  {path: 'eager2', component: Eager2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Eager2RoutingModule { }
