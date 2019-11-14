import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: Array<any> = null;
  public userForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: ApiService
  ) { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      codigo: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._service.getGlobal('usuarios/all').subscribe((data: any) => {
      this.users = data.data;
    });
  }

  public change = (user) => {
    this._service.putGlobal('usuarios', user).subscribe((data: any) => {
      if (data.ok) {
        alert('Usuario actualizado');
      }
    });
    console.log(user);
  }

  public onSubmit = () => {
    this._service.postGlobal('usuarios/add', this.userForm.value).subscribe((data: any) => {
      if (data.ok) {
        this.users.push(data.data);
        alert('Usuario creado.');
      }
    });
  }

}
