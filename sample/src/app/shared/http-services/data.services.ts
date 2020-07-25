import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';



@Injectable()
export class DataSerivce  {


 constructor( private httpClient:HttpClient) {

 }
   
 get(url: string): Observable<any> {
  return this.httpClient.get<Response>(url).pipe(catchError(error => {
    return this.handleError(of(error.error));
  } ));
}

post(url: string, body): Observable<any> {
  return this.httpClient.post<Response>(url, body).pipe(catchError(error => {
    return this.handleError(of(error.error));
  } ));
}

delete(url: string): Observable<any> {
  return this.httpClient.delete<Response>(url).pipe(catchError(error => {
    return this.handleError(of(error.error));
  } ));
}









private handleError (error: Response | any) {
 // In a real world app, you might use a remote logging infrastructure
 let errMsg: string;
 if (error instanceof Response) {
   const body = error.json() || '';
   const err = body || JSON.stringify(body);
   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
 } else {
   errMsg = error.value;
 }
 var friendlyErrorMsg ='';
 if(errMsg == "you are not supposed to access this!..."){
    friendlyErrorMsg = 'You are not permitted to do this!';
   // this.notify('Permission Required', friendlyErrorMsg, Enums.messageType.Info);
 }
 else{
    friendlyErrorMsg = 'Something bad happened; please try again later.';
  //  this.notify('Error', friendlyErrorMsg, Enums.messageType.Error);
 }

 return throwError(errMsg);
}



}


