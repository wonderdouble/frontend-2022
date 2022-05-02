import { Injectable } from '@angular/core';
import { Blog } from './blog.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  formData: Blog;
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

  uploadBlog(blog): Observable<Blog> {
    return this.http.post<Blog>(this.baseUri + '/blog/add', JSON.stringify(blog), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt) 
    )
  } 

  //get all blog
  getBlog(): Observable<any> {
    let url = `${this.baseUri}/blog`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getBlogMin(num): Observable<any> {
    let url = `${this.baseUri}/blog/?min=${num}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //get all land details
  getDetailsById(blog_id): Observable<any> {
    let url = `${this.baseUri}/blog/?id=${blog_id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateBlog(blog): Observable<Blog> {
    return this.http.put<Blog>(this.baseUri + '/blog', JSON.stringify(blog), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorMgmt)
    )
  }

  deleteBlog(id): Observable<Blog> {
    return this.http.delete<Blog>(this.baseUri + '/blog/?id='+id,  this.httpOptions)
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
