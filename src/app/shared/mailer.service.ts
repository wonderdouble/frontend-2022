import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Mailer } from './mailer.model';


@Injectable({
  providedIn: 'root'
})
export class MailerService {

  //baseUri:string = 'https://api.wonderdoubleglobal.com';
  baseUri:string = 'https://wonderdouble-backend.herokuapp.com';
  
  //baseUri:string = 'https://api.wongafix.com';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  constructor(
    private http: HttpClient) { }

    
    sendMail(data): Observable<Mailer> {
      return this.http.post<Mailer>(this.baseUri + '/sendmail', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorMgmt)
      ) 
    }  
  
    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      
      return throwError(errorMessage);
    }
    
    
}
