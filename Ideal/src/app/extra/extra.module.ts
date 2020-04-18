import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/modules/shared.module";
import {  ExtraRoutingModule } from './extra-routing.module';
import {  ExtraComponent } from './extra.component';

@NgModule({
  declarations: [ExtraComponent ],
  imports: [SharedModule, ExtraRoutingModule ], 
}) 
export class ExtraModule  { }
 