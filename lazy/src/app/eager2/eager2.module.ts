import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Eager2RoutingModule } from './eager2-routing.module';
import { Eager2Component } from './eager2/eager2.component';



@NgModule({
  declarations: [Eager2Component],
  imports: [
    CommonModule, SharedModule, Eager2RoutingModule
  ]
})
export class Eager2Module { }
