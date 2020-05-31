import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: "", redirectTo: "eager", pathMatch: "full" },
  // { path: "eager", component: EagerComponent },
     {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
     {path: 'lazy2', loadChildren: './lazy2/lazy2.module#Lazy2Module'}

  //{ path: 'lazy' , loadChildren : () => import('./lazy/lazy.module').then(m => m.LazyModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
