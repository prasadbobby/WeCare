  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError, map } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class CoachprofileService {

    constructor(private http: HttpClient) { }

    url = "http://localhost:8080/coaches";
    viewDetails(id: string): Observable<any> {
      return this.http.get<any[]>(this.url).pipe(
        map(coaches => {
          console.log(id);
          coaches.find(coach => coach.id === id)}),
        catchError(this.handleError)
      );
    }
    private handleError(err: HttpErrorResponse): Observable<any> {
      let errMsg = "";
      if (err.error instanceof Error) {
        console.log('An error occurred:', err.error.message);
        errMsg = err.error.message;
      }
      else {
        console.log(`Backend returned code ${err.status}`);
        errMsg = "Invalid Credentials";
      }
      return throwError(errMsg);
    }
  }
