import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveComponent } from './reactive-forms/reactive/reactive.component';
import { AddComponent } from './reactive-forms/add/add.component';
import { GroupComponent } from './reactive-forms/group/group.component';
import {
  LogValueDirective,
  ValidationComponent,
} from './reactive-forms/validation/validation.component';
import { StudentComponent } from './dynamic/student/student.component';
import { BookComponent } from './dynamic/book/book.component';
import { DynamicControlsComponent } from './dynamic/dynamic-controls/dynamic-controls.component';
import { JsonPipe } from '@angular/common';
import { StaticControlsComponent } from './dynamic/static-controls/static-controls.component';
import { ReactiveSampleComponent } from './reactive-forms/reactive-sample/reactive-sample.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    AddComponent,
    GroupComponent,
    ValidationComponent,
    LogValueDirective,
    StudentComponent,
    BookComponent,
    DynamicControlsComponent,
    StaticControlsComponent,
    ReactiveSampleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: JsonPipe }],
  bootstrap: [AppComponent],
})
export class AppModule {}
