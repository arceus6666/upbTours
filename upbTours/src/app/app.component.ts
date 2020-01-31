import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upbTours';
  // logged = this._service.logged;
  // role = this._service.role;

  constructor(
    public _service: AppService
  ) {
    const role = parseInt(localStorage.getItem('role'), 10);
    if (role) {
      this._service.login(role);
    }
    // this.role = this._service.role;
    // this.logged = this._service.logged;
  }

  logout() {
    localStorage.removeItem('role');
    this._service.logout();
  }

}
