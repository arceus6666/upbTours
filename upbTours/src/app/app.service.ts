import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  logged: boolean;
  role: number;

  constructor() {
    this.logged = false;
    this.role = null;
  }

  login(r: number) {
    this.logged = true;
    this.role = r;
  }

  logout() {
    this.logged = false;
    this.role = null;
  }
}
