import { HelperService } from './shared/services/helper.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { User } from 'oidc-client';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedIn: boolean;
  user: User;
  userSub: Subscription;
  displayName: string;
  currentTime: any;
  country: string;
  showHideSettings = false;

  constructor(
    public hs: HelperService,
    private authService: AuthService,
    private router: Router
  ) {
    // this.authService.isLoggedInObs()
    // .subscribe(flag => {
    //   this.loggedIn = flag;
    //   if (flag) {

    //     const retPath = window.localStorage.getItem('ret_path');

    //     if (retPath != null && retPath !== '' && retPath !== undefined) {
    //       window.localStorage.removeItem('ret_path');
    //       router.navigateByUrl(retPath);
    //     }


    //   } else {
    //      this.login();
    //   }
    // });

    // this.hs.getUser().subscribe(user => {
    //   this.displayName = user.given_name + ' ' + user.family_name;
    //   window.localStorage.setItem('userInfo', JSON.stringify(user));
    // });

    this.authService.isLoggedInObs()
      .subscribe(flag => {
        this.loggedIn = flag;
        if (flag) {
          const retPath = window.localStorage.getItem('ret_path');
          if (retPath != null && retPath !== '' && retPath !== undefined) {
            window.localStorage.removeItem('ret_path');
            router.navigateByUrl(retPath);
          }
        } else {
          this.login();
        }
      });
    this.userSub = this.authService.userLoadededEvent
      .subscribe(u => {

        const isAdmin = u.profile.roleids.split(',');

        if (isAdmin[0] === '1') {
          this.showHideSettings = true;
        }

        this.user = u;
        this.displayName = this.user.profile.given_name + ' ' + this.user.profile.family_name;
        this.country = this.decideCountry(this.user.profile.portalid);
      });


  }

  ngOnInit() {
    this.currentTime = Observable.interval(1000).map(x => new Date()).share();
  }


  login() {
    this.authService.startSigninMainWindow();
  }

  // logout() {
  //   this.authService.startSignoutMainWindow();
  // }

  logout() {
    window.localStorage.setItem('userInfo', '');
    window.localStorage.removeItem('userInfo');
    this.authService.startSignoutMainWindow();
  }



  decideCountry(portalId: string): string {
    if (portalId === '2') {
      return 'UK';
    } else if (portalId === '1') {
      return 'Netharland';
    } else if (portalId === '3') {
      return 'Germany';
    }
  }


}
