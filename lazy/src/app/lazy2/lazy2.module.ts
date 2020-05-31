import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lazy2Component } from './lazy2/lazy2.component';
import { Lazy2Service } from './lazy2.service';
import { Lazy2RoutingModule } from './lazy2-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [Lazy2Component],
  imports: [
    CommonModule,Lazy2RoutingModule,SharedModule
  ],
   providers:[Lazy2Service]
})
export class Lazy2Module { }
