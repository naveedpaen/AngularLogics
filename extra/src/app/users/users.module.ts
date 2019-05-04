import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { PrimeFacesModule } from '../shared/modules/primefaces.module';
import { MaterialModule } from '../shared/modules/material.module';
import { TasksRoutingModule } from './users-routing.module';
import { AdduserComponent } from './adduser/adduser.component';



@NgModule({
  declarations: [UsersComponent, AdduserComponent] ,
  imports: [ MaterialModule, PrimeFacesModule, TasksRoutingModule],
  exports: [ MaterialModule, PrimeFacesModule, TasksRoutingModule]

})

export class UsersModule {

}
