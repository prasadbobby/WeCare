import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  url="http://localhost:8080/bookings/";
  constructor(private http: HttpClient) { }

  appointments(): Observable<any>{
    return this.http.get(this.url);
  }

  rescheduleAppointment(id: string,data:any){
    return this.http.patch(this.url+id,data).pipe(
      tap(data=>console.log(data)),
      catchError(this.handleError)
    )
  }

  cancel(id:string): Observable<any>{
    return this.http.delete(this.url+id).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    )
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
