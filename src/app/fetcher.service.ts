import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {
  public url = "http://localhost:3000/api";

  public screenData = {}
  public dropArr = [1]
  public model = {}

  constructor(private httpClient: HttpClient) { }


  createDB(name)
  {
    const body = {"orgName":name}
    return this.httpClient.post<any>(this.url+"/createDB",body)
        .pipe(retry(1), catchError(this.handleError));
  }

  async createScreen()
  {
    const body={}
    return await this.httpClient.post<any>(this.url+"/createScreen",body)
      .pipe(retry(1), catchError(this.handleError));
  }

  public version = 1;
  async postScreen(data)
  {
    const body = {"version": this.version,"orgName":data.orgname,"orgID":data.adminid,"screenName":data.screenname,"screenID":data.screenid};
    return await this.httpClient.post<any>(this.url+"/postScreen",body)
        .pipe(retry(1),catchError(this.handleError));
  }


  async createMeta(formName)
  {
    const body = {"formName":formName}
    return await this.httpClient.post<any>(this.url+"/createMeta",body)
      .pipe(retry(1),catchError(this.handleError));
  }
  async postMeta(formName,formVersion,formID,formJSON,screenID)
  {
    const body = {"formName": formName,"formVersion":formVersion,"formID":formID,"formJSON":formJSON,"screenID":screenID};
    return await this.httpClient.post<any>(this.url+"/postMeta",body)
        .pipe(retry(1), catchError(this.handleError));
  }

  putMeta(dbName,formName,formID,formJSON)
  {
    const body = {"dbName":dbName,"formName": formName,"formID":formID,"formJSON":formJSON};
    return this.httpClient.put<any>(this.url+"/putMeta",body)
        .pipe(retry(1), catchError(this.handleError));
  }

  getMeta(dbName,formName,screenID)
  {
    return this.httpClient.get<any>(this.url+"/getMeta/"+dbName+"&"+formName+"&"+screenID)
        .pipe(retry(1), catchError(this.handleError));
  }


  async createForm(body)
  {
    return await this.httpClient.post<any>(this.url+"/createForm",body)
      .pipe(retry(1),catchError(this.handleError));
  }

  postForm(body)
  {
    return this.httpClient.post<any>(this.url+"/postForm",body)
      .pipe(catchError(this.handleError));
  }

  alterForm(body)
  {
    return this.httpClient.post<any>(this.url+"/putCols",body)
      .pipe(catchError(this.handleError));
  }
  
  // getForms(): Observable< any > {
  //   return new Observable(observer => {
  //     this.httpClient.get(this.url+"/getMeta")
  //       .subscribe(res => {
  //         observer.next( res);
  //       }, err => {
  //         observer.error(err);
  //       });
  //   });
  // }

  // putForms(model): Observable< any > {
    
  //   return new Observable(observer => {
  //     this.httpClient.post(this.url+"/postMeta/",model)
  //       .subscribe(res => {
  //         observer.next( res);
  //       }, err => {
  //         observer.error(err);
  //       });
  //   });
  // }



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
