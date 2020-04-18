import { ControlsComponent } from "./controls.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MaterialComponent } from './material/material.component';
import { PrimengComponent } from './primeng/primeng.component';

const routes: Routes = [
  { path: "", component: ControlsComponent },
  { path: "prime", component: PrimengComponent },
  { path: "material", component: MaterialComponent }
]; 
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlsRoutingModule {}
