import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

import { CommunicateRoutingModule } from './communicate-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { first } from 'rxjs/operators';
import { ThirdComponent } from './third/third.component';
import { ForthComponent } from './forth/forth.component';
import { SendToAppComponent } from './send-to-app/send-to-app.component';

@NgModule({
  declarations: [ParentComponent, ChildComponent, FirstComponent, SecondComponent, ThirdComponent, ForthComponent, SendToAppComponent],
  imports: [SharedModule, CommunicateRoutingModule],
  providers:[],
  exports:[FirstComponent]
})
export class CommunicateModule { }
