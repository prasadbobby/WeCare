import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userId: any;
  coachId: any;

  constructor(private http: HttpClient) { }
  url: string = "http://localhost:8080/";  
  login(role: string, formData: any): Observable<any> {
    return this.http.get(this.url + role + "/").pipe(
      // tap(data => console.log(data)),
      tap(data => {
        console.log(data)
        if (role === "users") {
          this.userId = data;
        }
        else {
          this.coachId = data;
        
        }
      }),
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
