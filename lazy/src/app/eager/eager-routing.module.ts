import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { EagerComponent } from "./eager/eager.component";

const routes: Routes = [
  {path: 'eager', component: EagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EagerRoutingModule { }