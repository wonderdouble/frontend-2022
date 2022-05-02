import { Injectable } from '@angular/core';
import { Archive } from './archive.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  formData: Archive;
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

  createArchive(archive): Observable<Archive> {
    return this.http.post<Archive>(this.baseUri + '/archive/add', JSON.stringify(archive), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  } 

  //get all blog
  getArchive(): Observable<any> {
    let url = `${this.baseUri}/archive`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get all archive details
  getDetailsById(archive_id): Observable<any> {
    let url = `${this.baseUri}/archive/?id=${archive_id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  deleteArchive(id): Observable<Archive> {
    return this.http.delete<Archive>(this.baseUri + '/archive/?id='+id,  this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  updateArchive(archive): Observable<Archive> {
    return this.http.put<Archive>(this.baseUri + '/archive', JSON.stringify(archive), this.httpOptions)
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
