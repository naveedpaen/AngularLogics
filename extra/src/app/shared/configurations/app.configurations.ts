import { Injectable } from '@angular/core';
// import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

@Injectable()
export class Configuration {
  // server = environment.production ? 'live/' : 'localhost/';

  commonURLs = {
    api: environment.production ? 'http://apinet.informanagement.com/api/' : 'http://uat-apinet.informanagement.com/api/',
    baseAppUrl: environment.production ? 'http://winapp.informanagement.com/' : 'http://winapp.informanagement.com:8080/'
  };

  identitySettings = {
    client_id : 'WINAPPANGULAR',
    identityUrl :  environment.production ? 'http://id.informanagement.com/' : 'http://id.informanagement.com/',
  };

  rowsPerPageOptions = [10 , 25, 50, 100];
  defaultPageSize = 10;


}
