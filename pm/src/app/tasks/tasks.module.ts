import { NgModule } from '@angular/core';
import { HelperModule } from './../shared/modules/helper.module';
import { MytaskComponent } from './mytask/mytask.component';
import { AlltasksComponent } from './alltasks/alltasks.component';
import { PrimeFacesModule } from '../shared/modules/primefaces.module';
import { MaterialModule } from '../shared/modules/material.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { AddTaskComponent } from './addtask/addtask.component';
import { TasksService } from './tasks.service';

@NgModule({
  declarations: [AlltasksComponent, MytaskComponent, AddTaskComponent],
  imports: [TasksRoutingModule, HelperModule],
  exports: [TasksRoutingModule, HelperModule],
  providers: [TasksService]

})

export class TasksModule { }
