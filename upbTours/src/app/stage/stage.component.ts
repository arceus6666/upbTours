import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IEstacion } from '../models/estacion.interface';
import { DataResponse } from '../models/dataresponse.interface';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  estaciones: Array<IEstacion> = null;
  editar: boolean = false;

  nombre: string;
  encargado: string;

  constructor(
    private _service: ApiService
  ) { }

  ngOnInit() {
    this._service.getGlobal('estaciones').subscribe((data: any) => {
      this.estaciones = data.data.sort(
        (a, b) => a.nombre < b.nombre ? -1 : a.nombre > b.nombre ? 1 : 0
      );
    });
  }

  edit(index: number) {
    // const id = this.estaciones[index].id;
    const nombre = (document.getElementById(`name${index}`) as HTMLInputElement).value;
    const encargado = (document.getElementById(`charge${index}`) as HTMLInputElement).value;
    const codigo = (document.getElementById(`code${index}`) as HTMLInputElement).value;
    // const estado = this.estaciones[index].estado;
    this.estaciones[index] = { nombre, encargado, codigo };
    this._service.putGlobal(`estaciones/${codigo}`, {
      nombre,
      encargado,
      codigo
    }).subscribe((data: DataResponse) => {
      console.log(data.data);
      if (data.ok) {
        alert('Estación actualizada.');
      }
    });
  }

  crear() {
    const nombre = (document.getElementById(`newname`) as HTMLInputElement).value;
    const encargado = (document.getElementById(`newcharge`) as HTMLInputElement).value;
    const codigo = (document.getElementById(`newcode`) as HTMLInputElement).value;
    this._service.postGlobal('estaciones', {
      nombre,
      encargado,
      codigo
    }).subscribe((data: DataResponse) => {
      if (data.ok) {
        this.estaciones.push({ nombre, encargado, codigo });
        alert('Estación creada.');
      }
    });
  }

  remove(codigo: string) {
    this._service.deleteGlobal(`estaciones/${codigo}`).subscribe((data: DataResponse) => {
      if (data.ok) {
        this.estaciones = this.estaciones.filter(s => s.codigo !== codigo);
        alert('Estación eliminada.');
      }
    });
  }

}
