import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSerivce } from '../http-services/data.services';



@NgModule({
providers:[DataSerivce]
})
export class CoreModule {




 }
