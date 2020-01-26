import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { DataResponse } from '../models/dataresponse.interface';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<any> = null;
  userForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _appService: AppService
  ) { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      codigo: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._apiService.getGlobal('usuarios/all').subscribe((data: any) => {
      this.users = data.data;
    });
  }

  remove(user: User) {
    // console.log(user);
    this._apiService.deleteGlobal(`usuarios/${user.codigo}`).subscribe((data: DataResponse) => {
      console.log(data);
      if (data.ok) {
        alert('Usuario eliminado');
      }
    });
  }

  change(user: User, index: number) {
    const role = document.getElementById(`role${index}`) as HTMLInputElement;
    user.role = role.value;
    // console.log(user, role.value);

    this._apiService.putGlobal('usuarios', user).subscribe((data: any) => {
      if (data.ok) {
        this.users = this.users.filter((u: User) => u.codigo !== user.codigo);
        alert('Usuario actualizado');
      }
    });
  }

  onSubmit() {
    this._apiService.postGlobal('usuarios/add', this.userForm.value).subscribe((data: any) => {
      if (data.ok) {
        this.users.push(data.data);
        alert('Usuario creado.');
      }
    });
  }

}
