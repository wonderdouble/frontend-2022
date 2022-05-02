import { Injectable } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Router } from "@angular/router";
import { Client} from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  formData: Client;
  
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
    private http: HttpClient,
    private router: Router
    ) { 
  }

  createClient(data): Observable<Client> {
    return this.http.post<Client>(this.baseUri + '/client/add', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    ) 
  }  

   //get all clients
   getClients(): Observable<any> {
    let url = `${this.baseUri}/client`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getClientById(id): Observable<any> {
    let url = `${this.baseUri}/client/?id=${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getByEmail(email): Observable<any> {
    let url = `${this.baseUri}/client/?email=${email}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  login(data): Observable<any> {
    return this.http.post(this.baseUri + '/client/auth', JSON.stringify(data), this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      );
  }

  signOut() {
    localStorage.removeItem('clientInfo');
    localStorage.removeItem('clientToken');
    this.router.navigate(['client']);
  }

  checkLogin(){
    const admin = JSON.parse(localStorage.getItem('clientInfo'));
    if (admin == null){
      this.router.navigate(['client/login']);
    }
  }

  updateClient(client): Observable<Client> {
    return this.http.post<Client>(this.baseUri + '/client/reset', JSON.stringify(client), this.httpOptions)
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
