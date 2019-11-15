import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _service: ApiService,
    private _app: AppService
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      codigo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value)
    this._service.postGlobal('usuarios/login', this.loginForm.value).subscribe((data: any) => {
      if (data.ok) {
        this._app.login(data.data.esAdmin);
        this._router.navigateByUrl('/main');
      }
    }, err => {
      if (err.error.msg === 'Wrong password') {
        alert('Contraseña incorrecta!');
      }
    });
  }

}
