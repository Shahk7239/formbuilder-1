import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {
  public serverUrl = "http://localhost:3000/";
  constructor(private httpClient: HttpClient) { }

  getForms(): Observable< any > {
    console.log("at your service")
    return new Observable(observer => {
      var dummy = {"test":"body"}
      this.httpClient.get("http://localhost:3000/page1")
        .subscribe(res => {
          console.log(res)
          observer.next( res);
        }, err => {
          observer.error(err);
        });
    });
  }

  putForms(model): Observable< any > {
    console.log("at your service")
    console.log( typeof (model))
    return new Observable(observer => {
      console.log('i am in service')
      var dummy = {"stringVal":model}
      this.httpClient.post("http://localhost:3000/putforms/",dummy)
        .subscribe(res => {
          console.log(res)
          observer.next( res);
        }, err => {
          observer.error(err);
        });
    });
  }

  //Saveing screen data
  saveScreenData(screenData)
  {
    console.log(screenData);
    return this.httpClient.post<any>("http://localhost:3000/api/postScreen",screenData)
        .pipe(
        retry(1),
        catchError(this.handleError)
    )
  }



  //Handle errors for API calls
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
