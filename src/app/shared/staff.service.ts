import { Injectable } from '@angular/core';
import { Staff } from './staff.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  formData: Staff;
  //private _jsonURL = '/assets/staff.json';

  baseUri:string = 'https://wonderdouble-backend.herokuapp.com';
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
    /*this.getJSON().subscribe(data => {
      console.log(data);
     });*/
   }

  /*public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }*/

  uploadStaff(staff): Observable<Staff> {
    return this.http.post<Staff>(this.baseUri + '/staff/add', JSON.stringify(staff), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  //get all staff
  getStaff(): Observable<any> {
    let url = `${this.baseUri}/staff`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get staff by id
  getStaffById(id): Observable<any> {
    let url = `${this.baseUri}/staff/?id=${id}`;
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
