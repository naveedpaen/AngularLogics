import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { UserManager, User } from 'oidc-client';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import * as Enums from './enum.service';
import { HttpClient } from '@angular/common/http';



const appBaseUri = Enums.commonURLs.baseAppUrl;

const settings: any = {
  client_id: Enums.identitySettings.client_id,
  authority: Enums.identitySettings.identityUrl + 'identity',

  post_logout_redirect_uri: appBaseUri,
  redirect_uri: appBaseUri + 'signin-callback.html',
  silent_redirect_uri: appBaseUri + 'silent-renew.html',

  response_type: 'id_token token',
  scope: 'openid profile address inforScope roles offline_access',

  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime: 4,
  silentRequestTimeout: 10000,
  filterProtocolClaims: true,
  loadUserInfo: true
};

@Injectable()
export class AuthService {
    mgr: UserManager = new UserManager(settings);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;
  authHeaders: Headers;




  constructor(private http:  HttpClient, private location: Location, private router: Router) {
    this.mgr.getUser()
      .then((user) => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.userLoadededEvent.emit(user);
        } else {
          this.loggedIn = false;
        }
      })
      .catch((err) => {
        this.loggedIn = false;
      });

    this.mgr.events.addUserLoaded((user) => {
      this.currentUser = user;
      this.loggedIn = !(user === undefined);
      if (!environment.production) {
        console.log('authService addUserLoaded', user);
      }

    });

    this.mgr.events.addUserUnloaded((e) => {
      if (!environment.production) {
        console.log('user unloaded');
      }
      this.loggedIn = false;
    });

  }

  isLoggedInObs(): Observable<boolean> {


    return Observable.fromPromise(this.mgr.getUser()).map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }

  clearState() {
    this.mgr.clearStaleState().then(function () {
      console.log('clearStateState success');
    }).catch(function (e) {
      console.log('clearStateState error', e.message);
    });
  }

  getUser() {
    this.mgr.getUser().then((user) => {
      this.currentUser = user;
      console.log('got user', user);
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      this.userLoadededEvent.emit(null);
      console.log('user removed');
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSigninMainWindow() {
    const loc = this.location.path();
    if (loc.length > 2) {
      window.localStorage.setItem('ret_path', loc);
    }
    this.mgr.signinRedirect({ data: 'some data' }).then(function () {

      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
    });
  }
  endSigninMainWindow() {
    this.mgr.signinRedirectCallback().then(function (user) {
      console.log('signed in', user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSignoutMainWindow() {
    this.mgr.getUser().then(user => {
      return this.mgr.signoutRedirect({ id_token_hint: user.id_token }).then(resp => {
        console.log('signed out', resp);
        setTimeout(5000, () => {
          console.log('testing to see if fired...');
        });
      }).catch(function (err) {
        console.log(err);
      });
    });
  }


  endSignoutMainWindow() {
    this.mgr.signoutRedirectCallback().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err);
    });
  }

  getAccessToken(): string {
    if (this.loggedIn) {
      return this.currentUser.access_token;
    }
    return '';
  }

  /**
   * Example of how you can make auth request using angulars http methods.
   * @param options if options are not supplied the default content type is application/json
   */



  get(url: string): Observable<any> {
    return this.http.get<Response>(url);
  }

  post(url: string, body: string): Observable<any> {
      return this.http.post<Response>(url, body);
  }

  delete(url: string): Observable<any> {
      return this.http.delete<Response>(url);
  }

}


