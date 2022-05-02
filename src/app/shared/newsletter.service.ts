import { Injectable } from '@angular/core';
import { Newsletter } from './newsletter.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  formData: Newsletter;
  //private _jsonURL = '/assets/listings.json';

  //baseUri:string = 'https://api.wonderdoubleglobal.com';
  baseUri:string = 'https://wonderdouble-backend.herokuapp.com';

  baseUri_wonder:string = 'https://api.wonderdoubleglobal.com';
  //baseUri:string = 'http://localhost:9090';
  
  //headers = new HttpHeaders().set('Content-Type', 'application/json');
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(
    private http: HttpClient
  ) { 
   
  }

  create(data): Observable<any> {
    return this.http.post(this.baseUri + '/newsletter/add', JSON.stringify(data), this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      );
  }

  getNewsLetter(): Observable<any> {
    let url = `${this.baseUri}/newsletter`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getNewsLetterWonder(): Observable<any> {
    let url = `${this.baseUri_wonder}/newsletter`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
