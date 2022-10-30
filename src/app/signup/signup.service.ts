import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  url:string ="http://localhost:8080/";
  register(role:string,data: any): Observable<any>{
    console.log(data);
    const options=new HttpHeaders({'ContentType':'application/json'}).append('Authorization','Bearer'+' '+GlobalService.authtoken);
    console.log(headers);
    return this.http.post(this.url+role,data,{headers: options}).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }

}
