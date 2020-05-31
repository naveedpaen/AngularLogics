import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { LazyComponent } from './lazy/lazy.component';


const routes: Routes = [
  {path: '', component: LazyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }


// export const routing: ModuleWithProviders = RouterModule.forChild(routes);