import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CssComponent } from './css/css.component';
import { ExtraComponent } from './extra/extra.component';

const routes: Routes = [
  { path: "extra", component: ExtraComponent },
  { path: "css", component: CssComponent },
]; 
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraRoutingModule {}
