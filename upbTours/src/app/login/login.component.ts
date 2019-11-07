import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) {

  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit = () => {
    this._router.navigateByUrl('/main')
  }

}
