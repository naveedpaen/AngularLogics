import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExtraComponent } from '../extra/extra.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { ComoneComponent } from './comone/comone.component';
import { ComtwoComponent } from './comtwo/comtwo.component';

const routes: Routes = [
  { path: "parent", component: ParentComponent },
  { path: "child", component: ChildComponent },
  { path: "com1", component: ComoneComponent },
  { path: "com2", component: ComtwoComponent },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicateRoutingModule { }
