import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth.guard';
import { AdduserComponent } from './adduser/adduser.component';

const usersRoutes: Routes = [
     {path: 'users',  children: [
      {path: 'user', component: UsersComponent},
      {path: 'add', component: AdduserComponent},

     ]
    },
];

@NgModule ({
imports: [RouterModule.forChild(usersRoutes)],
exports: [RouterModule]
})

export class TasksRoutingModule {
}
