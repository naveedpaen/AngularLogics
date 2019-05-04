import { NgModule } from '@angular/core';
import { HelperModule } from '../shared/modules/helper.module';
import { MaterialModule } from '../shared/modules/material.module';
import { PrimeFacesModule } from '../shared/modules/primefaces.module';
import { AddprojectComponent } from './addproject/addproject.component';
import { AllprojectsComponent } from './allprojects/allprojects.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectService } from './projects.service';
import { CommonModule } from '../shared/modules/common.module';


@NgModule({
  declarations: [AllprojectsComponent, AddprojectComponent, ProjectdetailComponent],
  imports: [ ProjectsRoutingModule, HelperModule],
  exports: [ ],
  providers: [ProjectService]
})

export class ProjectsModule { }

