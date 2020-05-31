import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyService } from './lazy.service';
import { LazyComponent } from './lazy/lazy.component';
import {LazyRoutingModule} from './lazy-routing.module';
import { UtilityService } from '../shared/utility.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, LazyRoutingModule, SharedModule
  ],
  declarations: [LazyComponent],
  providers: [LazyService]
})
export class LazyModule { }