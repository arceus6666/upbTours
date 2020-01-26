import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  logged: boolean;
  role: string;

  constructor() {
    this.logged = false;
    this.role = null;
  }

  login(r: string) {
    this.logged = true;
    this.role = r;
  }

  logout() {
    this.logged = false;
    this.role = null;
  }
}
