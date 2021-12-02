import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/modules/shared.module";
import {  ExtraRoutingModule } from './extra-routing.module';
import { ExtraComponent } from './extra/extra.component';
import { CssComponent } from './css/css.component';
import { SmallComponent } from './small/small.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ExtraComponent, CssComponent, SmallComponent ],
  imports: [SharedModule, ExtraRoutingModule, HttpClientModule ], 
  exports:[CssComponent,SmallComponent]
}) 
export class ExtraModule  { }
 