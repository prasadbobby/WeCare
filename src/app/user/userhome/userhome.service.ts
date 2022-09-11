import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserhomeService {

  constructor(private http: HttpClient) { }

  url="http://localhost:8080/coaches";
  bookUrl="http://localhost:8080/bookings"
  allcoaches(): Observable<any>{
    return this.http.get(this.url).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  confirmAppointment(data: any){
    const options=new HttpHeaders({'ContentType':'application/json'});
    return this.http.post(this.bookUrl,data,{headers: options}).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }

}
