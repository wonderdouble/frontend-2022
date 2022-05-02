import { Injectable } from '@angular/core';
import { Myproperty } from './myproperty.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MypropertyService {

  formData: Myproperty;
  //private _jsonURL = '/assets/subscribers.json';

  //baseUri:string = 'https://api.wonderdoubleglobal.com';
  baseUri:string = 'https://wonderdouble-backend.herokuapp.com';
  
  //baseUri:string = 'https://pragmatic-backend.herokuapp.com';
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
    /*this.getJSON().subscribe(data => {
      console.log(data);
    });*/
  }

  /*public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }*/

  uploadMyProperty(myProperty): Observable<Myproperty> {
    return this.http.post<Myproperty>(this.baseUri + '/myproperty/add', JSON.stringify(myProperty), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt) 
    )
  } 

  //get all blog
  getMyProperty(): Observable<any> {
    let url = `${this.baseUri}/myproperty`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getMyPropertyMin(num): Observable<any> {
    let url = `${this.baseUri}/myproperty/?min=${num}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get all land details
  getDetailsById(myprop_id): Observable<any> {
    let url = `${this.baseUri}/myproperty/?id=${myprop_id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateMyProperty(myProperty): Observable<Myproperty> {
    return this.http.put<Myproperty>(this.baseUri + '/myproperty', JSON.stringify(myProperty), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  deleteMyProperty(id): Observable<Myproperty> {
    return this.http.delete<Myproperty>(this.baseUri + '/myproperty/?id='+id,  this.httpOptions)
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
