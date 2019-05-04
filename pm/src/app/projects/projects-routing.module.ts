import { NgModule } from '@angular/core';
import { AddprojectComponent } from './addproject/addproject.component';
import { AllprojectsComponent } from './allprojects/allprojects.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth.guard';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';

const projectsRoutes: Routes = [
     {path: 'projects',  children: [
      {path: '', component: AllprojectsComponent},
      {path: 'add', component: AddprojectComponent},
      {path: 'detail/:id', component: ProjectdetailComponent},
      {path: 'edit/:id' , component: AddprojectComponent},




     ]
    },
];




@NgModule ({
imports: [RouterModule.forChild(projectsRoutes)],
exports: [RouterModule]
})

export class ProjectsRoutingModule { }






