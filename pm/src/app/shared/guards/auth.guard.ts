
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';



@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {


    constructor(private authService: AuthService, private router: Router) { }
    canActivate() {
        return this.authenticateUser();
    }
    canActivateChild() {
       return this.authenticateUser();
    }

    authenticateUser() {
        const isLoggedIn = this.authService.isLoggedInObs();
        isLoggedIn.subscribe((loggedin) => {
            if (!loggedin) {
                // this.router.navigate(['unauthorized']);
                this.authService.startSigninMainWindow();
            }
        });
        return isLoggedIn;
    }


}

