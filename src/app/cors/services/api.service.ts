import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { Observable,throwError } from 'rxjs';


import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
    
  ) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    console.log(`${environment.api_url}${path}`, { params })
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }


  async getSync(path: string, params: HttpParams = new HttpParams()): Promise<any> {
    return await this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors)).toPromise();
  }

  put(path: string, body: Object = {}): Observable<any> {
    const headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  }
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),headers
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    const headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  }
   
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),headers
   
    ).pipe(catchError(this.formatErrors));
  }

  postFormData(path: string, formData:FormData): Observable<any> {
 
    const headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
      })
  }
    return this.http.post(
      `${path}`,
      formData,
      {headers:{"Content-Type":"application/x-www-form-urlencoded"}}
    ).pipe(catchError(this.formatErrors));
  }

  putFormData(path: string, formData:FormData): Observable<any> {
  
   
    return this.http.put(
      `${environment.api_url}${path}`,
      formData
   
    ).pipe(catchError(this.formatErrors));
  }
  
  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}