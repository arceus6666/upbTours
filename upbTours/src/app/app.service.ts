import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  logged: boolean;
  esAdmin: boolean;

  constructor() {
    this.logged = false;
    this.esAdmin = null;
  }

  login(es: boolean) { this.logged = true; this.esAdmin = es; }
  logout() { this.logged = false; this.esAdmin = null; }
}
