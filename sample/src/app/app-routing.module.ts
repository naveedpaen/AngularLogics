import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ExtraComponent } from './extra/extra/extra.component';
import { FinalModule } from './final/final.module';
const routes: Routes = [
  {path: '' , component: ExtraComponent } ,
  { path: 'controls' , loadChildren : () => import('./controls/controls.module').then(m => m.ControlsModule)},
  { path: 'final' , loadChildren : () => import('./final/final.module').then(m => m.FinalModule)},
  //  {path: '' , loadChildren: './controls/controls.module#ControlsModule'},
  {path: 'all' , loadChildren: './extra/extra.module#ExtraModule'},

//  {path: '**' , component: MaterialComponent} // should be at last line
];
  
@NgModule({ 
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
