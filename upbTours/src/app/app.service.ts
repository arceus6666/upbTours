import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public logged: boolean;
  public esAdmin: boolean;

  constructor(
    private _service: ApiService
  ) {
    this.logged = false;
    this.esAdmin = null;
  }

  public login = (es: boolean) => { this.logged = true; this.esAdmin = es; };
  public logout = (es: boolean) => { this.logged = false; this.esAdmin = es; };
}
