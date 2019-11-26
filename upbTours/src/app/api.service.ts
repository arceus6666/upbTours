import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private backend_url: string;

  constructor(private _http: HttpClient) {
    // change this to http://skynet.lp.upb.edu:7890/ when on build
    this.backend_url = 'http://localhost:3000/';
  }

  getGlobal<Object>(
    url: string
  ): Observable<Object> {
    return this._http.get<Object>(`${this.backend_url}${url}`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(map((data: any) => data));
  }

  postGlobal<Object>(
    url: string,
    body: any
  ) {
    body = JSON.stringify(body);
    return this._http.post<Object>(`${this.backend_url}${url}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteGlobal<Object>(
    url: string
  ) {
    return this._http.delete<Object>(`${this.backend_url}${url}`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  putGlobal<Object>(
    url: string,
    body: any
  ) {
    body = JSON.stringify(body);
    return this._http.put<Object>(`${this.backend_url}${url}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}