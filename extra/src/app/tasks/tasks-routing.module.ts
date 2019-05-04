import { MytaskComponent } from './mytask/mytask.component';
import { AlltasksComponent } from './alltasks/alltasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth.guard';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import { AddTaskComponent } from './addtask/addtask.component';


const tasksRoutes: Routes = [
     {path: 'tasks',  children: [
        {path: '', component: AlltasksComponent },
      {path: 'alltasks', component: AlltasksComponent},
      {path: 'mine', component: MytaskComponent},
      {path: 'mine/:Id', component: MytaskComponent},
      {path: 'detail', component: TaskdetailComponent},
      {path: 'add', component: AddTaskComponent},
      {path: 'edit/:Id', component: AddTaskComponent},
      {path: ':Id', component: MytaskComponent},
     ]
    },
];

@NgModule ({
imports: [RouterModule.forChild(tasksRoutes)],
exports: [RouterModule]
})

export class TasksRoutingModule {

}
