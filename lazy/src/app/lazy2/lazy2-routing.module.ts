import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Lazy2Component } from './lazy2/lazy2.component';



const routes: Routes = [
  {path: '', component: Lazy2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lazy2RoutingModule { }
