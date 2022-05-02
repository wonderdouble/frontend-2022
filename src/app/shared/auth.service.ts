import { Injectable } from '@angular/core';
import { SharedModule } from "src/app/shared/shared.module";
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Router } from "@angular/router";
import { Admin } from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  formData: Admin;
  
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

  createAdmin(data): Observable<Admin> {
    return this.http.post<Admin>(this.baseUri + '/admin/add', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    ) 
  }  

  getByEmail(email): Observable<any> {
    let url = `${this.baseUri}/admin/?email=${email}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  login(data): Observable<any> {
    return this.http.post(this.baseUri + '/admin/auth', JSON.stringify(data), this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      );
  }

  signOut() {
    localStorage.removeItem('adminInfo');
    localStorage.removeItem('adminToken');
    this.router.navigate(['admin']);
  }

  checkLogin(){
    const admin = JSON.parse(localStorage.getItem('adminInfo'));
    if (admin == null){
      this.router.navigate(['admin/login']);
    }
  }

  updateAdmin(admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUri + '/admin/reset', JSON.stringify(admin), this.httpOptions)
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
