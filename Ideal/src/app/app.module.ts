import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponent } from './controls/material/material.component';
import { ExtraModule } from './extra/extra.module';
import { CoreModule } from './shared/modules/core.module';
import { CommunicateModule } from './communicate/communicate.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    // feature modules
    ExtraModule,
    CommunicateModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  } 
