import { Injectable } from '@angular/core';
import { RepRegister } from './rep-register.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepRegisterService {
  formData: RepRegister;
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
    private http: HttpClient,
    private router: Router
  ) {
    /*this.getJSON().subscribe(data => {
      console.log(data);
     });*/
   }

 
  createMember(member): Observable<RepRegister> {
    return this.http.post<RepRegister>(this.baseUri + '/agent/add', JSON.stringify(member), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    ) 
  }  

  //get all consultant
  getMember(): Observable<any> {
    let url = `${this.baseUri}/agent`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt) 
    )
  }

  //get all land details
  getMemberById(id): Observable<any> {
    let url = `${this.baseUri}/agent/?id=${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get by username
  getMemberByUsername(username): Observable<any> {
    let url = `${this.baseUri}/agent/?username=${username}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
 

  update(member): Observable<RepRegister> {
    return this.http.put<RepRegister>(this.baseUri + '/agent', JSON.stringify(member), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }


  deleteMember(id): Observable<any> {
    let url = `${this.baseUri}/agent/delete/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError(this.errorMgmt)
    )
  }

  login(data): Observable<any> {
    return this.http.post(this.baseUri + '/agent/auth', JSON.stringify(data), this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      );
  }

  reset(agent): Observable<RepRegister> {
    return this.http.post<RepRegister>(this.baseUri + '/agent/reset', JSON.stringify(agent), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }
 

  signOut() {
    localStorage.removeItem('agentInfo');
    localStorage.removeItem('agentToken');
    this.router.navigate(['agent']);
  }

  checkLogin(){
    const agent = JSON.parse(localStorage.getItem('agentInfo'));
    if (agent == null){
      this.router.navigate(['agent/login']);
    }
  }

  updateAdmin(admin): Observable<RepRegister> {
    return this.http.post<RepRegister>(this.baseUri + '/agent/reset', JSON.stringify(admin), this.httpOptions)
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
