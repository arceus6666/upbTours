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
    private _service: AppService
  ) {
    // this.role = this._service.role;
    // this.logged = this._service.logged;
  }

}
