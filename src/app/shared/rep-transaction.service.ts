import { Injectable } from '@angular/core';
import { RepTransaction } from './rep-transaction.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class RepTransactionService {

  formData: RepTransaction;
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

  createTransaction(transaction): Observable<any> {
    return this.http.post<RepTransaction>(this.baseUri + '/transaction/add', JSON.stringify(transaction), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }  

  //get all consultant
  getTransaction(): Observable<any> {
    let url = `${this.baseUri}/transaction`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getByUsername(username): Observable<any> {
    let url = `${this.baseUri}/transaction/?username=${username}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getByProperty(property): Observable<any> {
    let url = `${this.baseUri}/transaction/?property=${property}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getByStatus(status): Observable<any> {
    let url = `${this.baseUri}/transaction/?status=${status}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getByDate(date): Observable<any> {
    let url = `${this.baseUri}/transaction/?date=${date}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  

  getById(id): Observable<any> {
    let url = `${this.baseUri}/transaction/?id=${id}`;
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

  updateTransaction(transaction): Observable<RepTransaction> {
    return this.http.put<RepTransaction>(this.baseUri + '/transaction', JSON.stringify(transaction), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  deleteProperty(id): Observable<RepTransaction> {
    return this.http.delete<RepTransaction>(this.baseUri + '/transaction/?id='+id,  this.httpOptions)
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
