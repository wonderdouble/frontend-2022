import { Injectable } from '@angular/core';
import { Activities } from './activities.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  formData: Activities;
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

  uploadActivities(activities): Observable<Activities> {
    return this.http.post<Activities>(this.baseUri + '/activities/add', JSON.stringify(activities), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt) 
    )
  } 

  //get all blog
  getActivities(): Observable<any> {
    let url = `${this.baseUri}/activities`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getActivitiesMin(num): Observable<any> {
    let url = `${this.baseUri}/activities/?min=${num}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get all land details
  getDetailsById(activities_id): Observable<any> {
    let url = `${this.baseUri}/activities/?id=${activities_id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateActivities(activities): Observable<Activities> {
    return this.http.put<Activities>(this.baseUri + '/activities', JSON.stringify(activities), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  deleteActivities(id): Observable<Activities> {
    return this.http.delete<Activities>(this.baseUri + '/activities/?id='+id,  this.httpOptions)
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
