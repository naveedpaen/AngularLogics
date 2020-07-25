import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { ExtraComponent } from '../extra/extra/extra.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ForthComponent } from './forth/forth.component';
import { ThirdComponent } from './third/third.component';
import { SendToAppComponent } from './send-to-app/send-to-app.component';

const routes: Routes = [
  { path: "parent", component: ParentComponent },
  { path: "child", component: ChildComponent },
  { path: "first", component: FirstComponent },
  { path: "second", component: SecondComponent },
  { path: "third", component: ThirdComponent },
  { path: "forth", component: ForthComponent },
  { path: "send-to-app", component: SendToAppComponent },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicateRoutingModule { }
