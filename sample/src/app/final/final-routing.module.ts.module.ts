import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { SavepageComponent } from './savepage/savepage.component';

const routes: Routes = [
  { path: "", component: SavepageComponent }     ,
]; 


@NgModule({   
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalRouting { }
