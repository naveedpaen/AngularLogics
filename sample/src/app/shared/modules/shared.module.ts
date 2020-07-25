import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgModule } from './primeng.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [],
 //  imports: [ MaterialModule,PrimeNgModule, CommonModule, FormsModule, ReactiveFormsModule  ],
  exports: [MaterialModule,PrimeNgModule, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class SharedModule { }
