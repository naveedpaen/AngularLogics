import { SharedModule } from "./../shared/modules/shared.module";
import { NgModule } from "@angular/core";
import { MaterialComponent } from "./material/material.component";
import { PrimengComponent } from "./primeng/primeng.component";
import { BootstrapComponent } from "./bootstrap/bootstrap.component";
import { ControlsRoutingModule } from "./controls-routing.module";
import { ControlsComponent } from './controls.component';

@NgModule({
  declarations: [ControlsComponent , MaterialComponent, PrimengComponent, BootstrapComponent],
  imports: [SharedModule, ControlsRoutingModule], 
}) 
export class ControlsModule  { }
 