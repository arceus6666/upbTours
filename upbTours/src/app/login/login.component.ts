import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';
import { DataResponse } from '../models/dataresponse.interface';

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
    public _app: AppService
  ) { }

  ngOnInit() {
    if (this._app.role) {
      this._router.navigateByUrl('/main');
    }
    this.loginForm = this._formBuilder.group({
      codigo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value)
    this._service.postGlobal('usuarios/login', this.loginForm.value).subscribe((data: DataResponse) => {
      // console.log(data);
      if (data.ok) {
        this._app.login(data.data.role);
        localStorage.setItem('role', data.data.role);
        this._router.navigateByUrl('/main');
      } else {
        (document.getElementById('passid') as HTMLInputElement).value = '';
        if (data.msg === 'Wrong password') {
          alert('Contraseña incorrecta!');
        } else if (data.msg === 'User not found') {
          alert('Usuario inexistente');
        } else {
          alert(`Error desconocido\n${data.msg}`);
        }
      }
    }, err => {
      console.log(err);
      alert(`Error desconocido\n${err}`);
    });
  }

}
