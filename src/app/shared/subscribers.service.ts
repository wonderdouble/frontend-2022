import { Injectable } from '@angular/core';
import { Subscribers } from './subscribers.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  formData: Subscribers;
  //private _jsonURL = '/assets/subscribers.json';

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
    /*this.getJSON().subscribe(data => {
      console.log(data);
     });*/
   }

  /*public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }*/

  /*uploadSubscriber(subscribers): Observable<Subscribers> {
    return this.http.post<Subscribers>(this.baseUri + '/subscriber/create', JSON.stringify(subscribers), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  } */ 

  createSubscriber(subscriber): Observable<Subscribers> {
    return this.http.post<Subscribers>(this.baseUri + '/subscribers/add', JSON.stringify(subscriber), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    ) 
  }  

  //get all consultant
  getSubscribers(): Observable<any> {
    let url = `${this.baseUri}/subscribers`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get all land details
  getSubscribersById(id): Observable<any> {
    let url = `${this.baseUri}/subscribers/?id=${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
 

  update(subscribers): Observable<Subscribers> {
    return this.http.put<Subscribers>(this.baseUri + '/subscribers', JSON.stringify(subscribers), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  // // HttpClient API post() method => Create employee
  // updatePname(subscribers): Observable<Subscribers> {
  //   return this.http.put<Subscribers>(this.baseUri + '/subscribers/?phone='+id, JSON.stringify(subscribers), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // // HttpClient API post() method => Create employee
  // updateProperty(id, subscribers): Observable<Subscribers> {
  //   return this.http.put<Subscribers>(this.baseUri + '/subscribers/update_property/'+id, JSON.stringify(subscribers), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // updatePersonal(id, subscribers): Observable<Subscribers> {
  //   return this.http.put<Subscribers>(this.baseUri + '/subscribers/update_personal/'+id, JSON.stringify(subscribers), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // updateKin(id, subscribers): Observable<Subscribers> {
  //   return this.http.put<Subscribers>(this.baseUri + '/subscribers/update_kin/'+id, JSON.stringify(subscribers), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // updateUpload(id, subscribers): Observable<Subscribers> {
  //   return this.http.put<Subscribers>(this.baseUri + '/subscribers/update_upload/'+id, JSON.stringify(subscribers), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // updateStatus(id, subscribers): Observable<Subscribers> {
  //   return this.http.put<Subscribers>(this.baseUri + '/subscribers/update_status/'+id, JSON.stringify(subscribers), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorMgmt)
  //   )
  // }

  deleteSubscriber(id): Observable<any> {
    let url = `${this.baseUri}/subscriber/delete/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
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
