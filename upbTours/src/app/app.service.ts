import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public logged: boolean;

  constructor() {
    this.logged = false;
  }
}
