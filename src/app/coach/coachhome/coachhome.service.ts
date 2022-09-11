import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map, filter } from 'rxjs/operators';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CoachhomeService {

  constructor(private service: LoginService, private http: HttpClient) { }
  url:string="http://localhost:8080/bookings";
  schedules():Observable<any>{
    const coachId=this.service.coachId.id;
    return this.http.get(this.url).pipe(
      // tap(data => console.log(data)),
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

