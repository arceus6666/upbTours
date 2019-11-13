import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private backend_url: string;

  constructor(private _http: HttpClient) {
    // change this to http://skynet.lp.upb.edu:7890/ when on build
    this.backend_url = 'http://localhost:3000/';
  }

  public getGlobal<Object>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<Object> {
    return this._http.get<Object>(`${this.backend_url}${url}`, {
      headers: headers,
      params: params
    });
  }

  public postGlobal<Object>(
    url: string,
    body: any
  ) {
    body = JSON.stringify(body);
    return this._http.post<Object>(`${this.backend_url}${url}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public deleteGlobal<Object>(
    url: string,
    code: string,
  ) {
    return this._http.delete<Object>(`${this.backend_url}${url}/${code}`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public putGlobal<Object>(
    url: string,
    body: any
  ) {
    body = JSON.stringify(body);

    return this._http.put<Object>(`${this.backend_url}${url}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
