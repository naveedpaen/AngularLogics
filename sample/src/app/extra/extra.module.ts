import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/modules/shared.module";
import {  ExtraRoutingModule } from './extra-routing.module';
import { ExtraComponent } from './extra/extra.component';
import { CssComponent } from './css/css.component';

@NgModule({
  declarations: [ExtraComponent, CssComponent ],
  imports: [SharedModule, ExtraRoutingModule ], 
}) 
export class ExtraModule  { }
 