import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upbTours';
  public logged = this._service.logged;
  public esAdmin = this._service.esAdmin;

  constructor(
    private _service: AppService
  ) { }

}
