import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

import { CommunicateRoutingModule } from './communicate-routing.module';
import { SharedModule } from '../shared/modules/shared.module';
import { ComoneComponent } from './comone/comone.component';
import { ComtwoComponent } from './comtwo/comtwo.component';

@NgModule({
  declarations: [ParentComponent, ChildComponent, ComoneComponent, ComtwoComponent, ComoneComponent],
  imports: [SharedModule, CommunicateRoutingModule],
  providers:[ComoneComponent]
})
export class CommunicateModule { }
