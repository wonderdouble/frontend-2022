import { Injectable } from '@angular/core';
import { RepTraffic } from './rep-traffic.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})
export class RepTrafficService {

  formData: RepTraffic;
  //private _jsonURL = '/assets/listings.json';

  //baseUri:string = 'https://api.wonderdoubleglobal.com';
  baseUri:string = 'https://wonderdouble-backend.herokuapp.com';
  
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

  createTraffic(traffic): Observable<any> {
    return this.http.post<RepTraffic>(this.baseUri + '/traffic/add', JSON.stringify(traffic), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }  

  //get all consultant
  getTraffic(): Observable<any> {
    let url = `${this.baseUri}/traffic`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getByUsername(username): Observable<any> {
    let url = `${this.baseUri}/traffic/?username=${username}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getByProperty(property): Observable<any> {
    let url = `${this.baseUri}/traffic/?property=${property}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getByDate(date): Observable<any> {
    let url = `${this.baseUri}/traffic/?date=${date}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  

  getById(id): Observable<any> {
    let url = `${this.baseUri}/traffic/?id=${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get all land details
  // getDetailsByProperty(house_id): Observable<any> {
  //   let url = `${this.baseUri}/property/?id=${house_id}`;
  //   return this.http.get(url, this.httpOptions).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }

  updateTraffic(traffic): Observable<RepTraffic> {
    return this.http.put<RepTraffic>(this.baseUri + '/traffic', JSON.stringify(traffic), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  deleteProperty(id): Observable<RepTraffic> {
    return this.http.delete<RepTraffic>(this.baseUri + '/traffic/?id='+id,  this.httpOptions)
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
