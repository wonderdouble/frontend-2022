import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Transactions } from './transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  formData: Transactions;
  //private _jsonURL = '/assets/listings.json';

  //baseUri:string = 'https://api.wonderdoubleglobal.com';
  baseUri:string = 'https://wonderdouble-backend.herokuapp.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  constructor(
    private http: HttpClient) { }

    
    createTransaction(data): Observable<Transactions> {
      return this.http.post<Transactions>(this.baseUri + '/transaction/add', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorMgmt)
      ) 
    }  
  
    //get subscribers by phone no
    getTransactions(): Observable<any> {
      let url = `${this.baseUri}/transaction`;
      return this.http.get(url, this.httpOptions).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    //get subscribers by id
    getTransactionsById(id): Observable<any> {
      let url = `${this.baseUri}/transaction/find/?id=${id}`;
      return this.http.get(url, this.httpOptions).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    //get subscribers by id
    getTransactionsByCustomerId(id): Observable<any> {
      let url = `${this.baseUri}/transaction/find/?customer_id=${id}`;
      return this.http.get(url, this.httpOptions).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    getTransactionsByEmail(email): Observable<any> {
      let url = `${this.baseUri}/transaction/find/?email=${email}`;
      return this.http.get(url, this.httpOptions).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    updateTransactions(transaction): Observable<Transactions> {
      return this.http.put<Transactions>(this.baseUri + '/transaction', JSON.stringify(transaction), this.httpOptions)
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
