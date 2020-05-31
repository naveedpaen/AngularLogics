import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EagerModule } from './eager/eager.module';
import { UtilityService } from './shared/utility.service';
import { Eager2Component } from './eager2/eager2/eager2.component';
import { Eager2Module } from './eager2/eager2.module';
import { TestComponent } from './test/test.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EagerModule,
    Eager2Module,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
