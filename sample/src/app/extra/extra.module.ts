import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/modules/shared.module";
import {  ExtraRoutingModule } from './extra-routing.module';
import { ExtraComponent } from './extra/extra.component';
import { CssComponent } from './css/css.component';
import { SmallComponent } from './small/small.component';

@NgModule({
  declarations: [ExtraComponent, CssComponent, SmallComponent ],
  imports: [SharedModule, ExtraRoutingModule ], 
  exports:[CssComponent,SmallComponent]
}) 
export class ExtraModule  { }
 