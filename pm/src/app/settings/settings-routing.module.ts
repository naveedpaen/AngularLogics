import { SettingComponent } from './setting/setting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth.guard';
import { AddsettingComponent } from './addsetting/addsetting.component';
import { ImagesComponent } from './images/images.component';

const settingsRoutes: Routes = [
     {path: 'settings',  children: [
      {path: '', component: SettingComponent},
      {path: 'add', component: AddsettingComponent},
      {path: 'edit/:id', component: AddsettingComponent},
      {path: 'images', component: ImagesComponent},
     ]
    },
];

@NgModule ({
imports: [RouterModule.forChild(settingsRoutes)],
exports: [RouterModule]
})


export class SettingRoutingModule {
}
