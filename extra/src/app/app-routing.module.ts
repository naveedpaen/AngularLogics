
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { Component } from '@angular/core/src/metadata/directives';
import { BoardComponent } from './board/board.component';



const appRoutes: Routes = [
  {path: '', redirectTo: '/home' , pathMatch: 'full'},
  {path: 'home', component: DashboardComponent},
  {path: 'board',   component: BoardComponent },
  // {path: 'src/test/a.pdf',   },


  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})





export class ApproutingModule {


}


