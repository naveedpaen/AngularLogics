import { NgModule } from '@angular/core';
import { PrimeFacesModule } from '../shared/modules/primefaces.module';
import { MaterialModule } from '../shared/modules/material.module';
import { TasksRoutingModule } from '../users/users-routing.module';
import { AddsettingComponent } from './addsetting/addsetting.component';
import { SettingComponent } from './setting/setting.component';
import { AddSettingService } from './addsetting/addsetting.service';
import { SettingService } from './setting.service';
import { ImagesComponent } from './images/images.component';
import { HelperModule } from '../shared/modules/helper.module';


@NgModule({
 declarations: [ AddsettingComponent, SettingComponent, ImagesComponent ],
  imports: [ TasksRoutingModule, HelperModule ],
  exports: [  TasksRoutingModule ],
  providers: [AddSettingService, SettingService]
})

export class SettingsModule { }
