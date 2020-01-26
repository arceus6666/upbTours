import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Estacion } from '../models/estacion.interface';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  // estaciones: Array<Estacion> = null;
  estacionesShow: Array<Array<Estacion>> = null;
  editar: boolean = false;
  index: string = null;
  el = 0;
  ll = 0;

  nombre: string;
  encargado: string;

  constructor(
    private _service: ApiService
  ) { }

  ngOnInit() {
    this._service.getGlobal('estaciones').subscribe((data: any) => {
      // this.estaciones = data.data;
      const estaciones = data.data;
      let l = estaciones.length;
      this.ll = l;
      l /= 3;
      l = parseInt(l, 10) + 1;
      this.el = l;
      this.estacionesShow = new Array(l);
      let k = 0;
      for (let i = 0; k < estaciones.length; i++) {
        this.estacionesShow[i] = new Array(3);
        for (let j = 0; j < 3 && k < estaciones.length; j++) {
          this.estacionesShow[i][j] = estaciones[k];
          k++;
        }
      }
    });
  }

  edit(stage: Estacion) {
    this.editar = true;
    this.index = stage.id;
    this.nombre = stage.nombre;
    this.encargado = stage.encargado;
  }

  accept(c: number, r: number) {
    this.estacionesShow[r][c].nombre = this.nombre;
    this.estacionesShow[r][c].encargado = this.encargado;
    setTimeout(() => {
      this._service.putGlobal(`estaciones/${this.estacionesShow[r][c].id}`, this.estacionesShow[r][c]).subscribe((data: any) => {
        if (data.ok) {
          alert('Editado correctamente');
        }
      });
    }, 50);
    this.nombre = null;
    this.encargado = null;
    this.editar = false;
    this.index = null;
  }

  crear(nombre: string, encargado: string) {
    // console.log(nombre, encargado);
    this._service.postGlobal('estaciones', { nombre, encargado }).subscribe((data: any) => {
      if (data.ok) {
        // this.estacionesShow[this.el - 1].push(data.data);
        // this.ll++;
        alert('Estación creada.');
      }
    });
    // console.log(this.estacionesShow[this.el - 1]);
  }

}
