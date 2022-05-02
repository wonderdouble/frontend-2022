import { Injectable } from '@angular/core';
import { Property } from './property.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  formData: Property;
  //private _jsonURL = '/assets/listings.json';

  baseUri:string = 'https://wonderdouble-backend.herokuapp.com';
  //baseUri:string = 'https://api.wonderdoubleglobal.com';
  
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

  createProperty(property): Observable<any> {
    return this.http.post<Property>(this.baseUri + '/property/add', JSON.stringify(property), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }  

  //get all consultant
  getProperty(): Observable<any> {
    let url = `${this.baseUri}/property`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get all consultant
  getTopProperty(): Observable<any> {
    let url = `${this.baseUri}/property/top`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getPropertyMin(num): Observable<any> {
    let url = `${this.baseUri}/property/?min=${num}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getPropertyById(id): Observable<any> {
    let url = `${this.baseUri}/property/?id=${id}`;
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

  updateProperty(property): Observable<Property> {
    return this.http.put<Property>(this.baseUri + '/property', JSON.stringify(property), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  deleteProperty(id): Observable<Property> {
    return this.http.delete<Property>(this.baseUri + '/property/?id='+id,  this.httpOptions)
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
