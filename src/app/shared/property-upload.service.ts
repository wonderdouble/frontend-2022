import { Injectable } from '@angular/core';
import { PropertyUpload } from './property-upload.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyUploadService {

  formData: PropertyUpload;
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
  ) { }

  //get all house details
  getUploadByPropertyId(prop_id): Observable<any> {
    let url = `${this.baseUri}/property-upload/?property_id=${prop_id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // HttpClient API put() method => Delete Cv
  deleteUpload(id): Observable<PropertyUpload> {
    return this.http.delete<PropertyUpload>(this.baseUri + '/property-upload/?id='+id,  this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  createUpload(upload): Observable<PropertyUpload> {
    return this.http.post<PropertyUpload>(this.baseUri + '/property-upload/add', JSON.stringify(upload), this.httpOptions)
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
