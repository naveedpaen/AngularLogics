import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavepageComponent } from './savepage/savepage.component';
import { FinalRouting } from './final-routing.module.ts.module';



@NgModule({
  declarations: [SavepageComponent],
  imports: [
    CommonModule,
    FinalRouting
  ]
})
export class FinalModule { }
