import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExtraComponent } from './extra.component';

const routes: Routes = [
  { path: "extra", component: ExtraComponent },
]; 
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraRoutingModule {}
