
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { ApproutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingRoutingModule } from './settings/settings-routing.module';
import { SettingsModule } from './settings/settings.module';
import { CustomHttpInterceptor } from './shared/configurations/customHttpInterceptor';
import { AuthGuardService } from './shared/guards/auth.guard';
import { CommonModule } from './shared/modules/common.module';
// import { PrimeFacesModule } from './shared/modules/primefaces.module';
import { MaterialModule } from './shared/modules/material.module';
import { AttachmentService } from './shared/services/attachment.service';
import { AuthService } from './shared/services/auth.service';
import { HelperService } from './shared/services/helper.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';



@NgModule({
  declarations: [
    AppComponent, DashboardComponent, BoardComponent
  ],


  imports: [
    BrowserModule,
    ApproutingModule,
    RouterModule,
    MaterialModule,
    ProjectsModule,
    SettingsModule,
    TasksModule,
    UsersModule,
    SettingRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  exports: [
  ],

  providers: [AuthService, AuthGuardService, HelperService, AttachmentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
