import { FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import * as Enums from './enum.service';
import { Configuration } from '../configurations/app.configurations';
import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';




import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';


import { Params } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { TreeNode } from 'primeng/primeng';



@Injectable()
export class HelperService {

  constructor(private notifyservice: NotificationService,
    private confirmationService: ConfirmationService,
    public config: Configuration,
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  // public alert: AlertsService


  // getUser(): Observable<any> {
  //   return Observable.create(observer => {
  //     this.authService.userLoadededEvent.subscribe(u => {
  //       observer.next(u.profile);
  //       observer.complete();
  //     });
  //   });
  // }


  // ----------------- HTTP REQUESTS ---------------------

  get(url: string): Observable<any> {
    return this.http.get<Response>(url).catch(error => {
      return this.handleError(error);
    });
  }

  post(url: string, body): Observable<any> {
    return this.http.post<Response>(url, body).catch(error => {
      return this.handleError(error);
    });
  }

  delete(url: string): Observable<any> {
    return this.http.delete<Response>(url).catch(error => {
      return this.handleError(error);
    });
  }

  addTokenToUploadRequest(request) {
    const token: string = this.authService.getAccessToken();
    if (token) {
      request.xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  }
  // ..........................................  Toasty Notification Methhod    .................................

  notify(_title: string, _body: string, _messagetype?: Enums.messageType, _timeout?: number) {
    this.notifyservice.addToast(_title, _body, _messagetype, _timeout);
  }


  // ..........................................      Confirmation  Prime          .....................................

  confirm(_title: string, message: string): Observable<boolean> {
    return Observable.create(observer => {
      this.confirmationService.confirm({
        message: message,
        header: _title,
        icon: 'fa fa-question-circle',
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }




  // Check query string param for null
  parseQueryParams(param: Params, defaultVal: any): any {
    if (param != null) {
      if (defaultVal === Enums.defaultQryString.orderByAsc) {
        if (param.value === true) {
          return Enums.orderBy.ascending;
        } else {
          return Enums.orderBy.descending;
        }
      }
      return param;
    }
    return defaultVal;
  }


  replaceAll = function (actualContent, oldString, newString) {
    const ignore = undefined;
    return actualContent.replace(
      new RegExp(
        oldString.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'),
        (ignore ? 'gi' : 'g')), (typeof (newString) === 'string') ? newString.replace(/\$/g, '$$$$') : newString);
  };

  parseTreeData(list): Observable<any> {
    return Observable.create(observer => {

      // tslint:disable-next-line:prefer-const
      let map = {}, node, roots = [], i;
      for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== '0' && node.parentId !== -1
          && node.parentId !== 0 && node.parentId !== undefined) {
          if (list[map[node.parentId]] !== undefined) {
            list[map[node.parentId]].children.push(node);
          }
        } else {
          roots.push(node);
        }
      }

      observer.next(roots);
      observer.complete();
    });
  }
  // ------------- make selection of Tree
  getSelectedNodesById(node: Array<any> , selectionIds: Number[] ): Array<any> {

    // tslint:disable-next-line:prefer-const
    let selectedNodesObject = [];
    node.forEach(n => {
      if (selectionIds.includes(n.id)) {
        n.expanded = true;
        selectedNodesObject.push(n);
      }
      if (n.children) {
        this.recursiveloop(n, selectionIds, selectedNodesObject);
      }

    });
    return selectedNodesObject;
  }

  recursiveloop(n, selectionIds, selectedNodesObject) {

      n.children.forEach(childNode => {
        if (selectionIds.includes(childNode.id)) {
          childNode.expanded = true;
          selectedNodesObject.push(childNode);
        }
        if (childNode.children) {
          this.recursiveloop(childNode, selectionIds, selectedNodesObject);
        }
      });

  }
  // ---------------------------------------


  isValidForm(_form: FormGroup): boolean {
    return _form.status === 'VALID' ? true : false;
    // const formValidationStatus = _form.status === 'VALID' ? true : false;
    // if (!_form.pristine && formValidationStatus) {
    //   return true;
    // } else {
    //   return false;
    // }
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    const friendlyErrorMsg = 'Something bad happened; please try again later.';
    this.notify('Error', friendlyErrorMsg, Enums.messageType.Error);
    return new ErrorObservable(friendlyErrorMsg);
  }



}
