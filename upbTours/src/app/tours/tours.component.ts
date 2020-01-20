import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Tour } from '../models/tour.interface';
import { Estacion } from '../models/estacion.interface';
import { Router } from '@angular/router';
import { ToursService } from './tours.service';
// tslint:disable: forin

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  tours: Array<Tour> = null;
  groups: Array<Array<any>> = null;
  // groupsid: Array<Array<any>> = null;
  // estaciones: Array<Estacion> = null;
  estacionesShow: Array<Array<Estacion>> = null;
  el = 0;
  ll = 0;

  cantidad: number;


  constructor(
    private _apiservice: ApiService,
    private _myservice: ToursService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._apiservice.getGlobal('tours').subscribe(async (data: { ok: boolean, msg: string, data: Array<Tour> }) => {
      // console.log(data);
      this.tours = await data.data;
    });
    // this._apiservice.getGlobal('estaciones').subscribe((data: any) => {
    //   const estaciones = data.data;
    //   let l = estaciones.length;
    //   this.ll = l;
    //   // console.log(l);
    //   l /= 6;
    //   l = parseInt(l, 10) + 1;
    //   this.el = l;
    //   this.estacionesShow = new Array(l);
    //   let k = 0;
    //   for (let i = 0; k < estaciones.length; i++) {
    //     this.estacionesShow[i] = new Array(6);
    //     for (let j = 0; j < 6 && k < estaciones.length; j++) {
    //       this.estacionesShow[i][j] = estaciones[k];
    //       k++;
    //     }
    //   }
    // });
    const estaciones = this._myservice.getEstacionesDefault();
    let l = estaciones.length;
    this.ll = l;
    // console.log(l);
    l /= 6;
    l = parseInt(`${l}`, 10) + 1;
    this.el = l;
    this.estacionesShow = new Array(l);
    let k = 0;
    for (let i = 0; k < estaciones.length; i++) {
      this.estacionesShow[i] = new Array(6);
      for (let j = 0; j < 6 && k < estaciones.length; j++) {
        this.estacionesShow[i][j] = estaciones[k];
        k++;
      }
    }
  }

  setGroups(g: string) {
    // const gg = parseInt(g, 10);
    this.cantidad = parseInt(g, 10);
    // console.log(g)
    document.getElementById('gi').hidden = true;
    document.getElementById('gb').hidden = true;
    this.groups = new Array(this.cantidad);
    // this.groupsid = new Array(this.cantidad);
    // console.log(this.groups);
  }

  showResults() {
    const name = document.getElementById('tourName') as HTMLInputElement;
    const l = this.groups[0].length;
    let encargados: Array<string> = [];

    if (!name.value) {
      alert('Introduzca el nombre del tour.');
      return;
    }

    for (let i = 0; i < this.cantidad; i++) {
      const enc = document.getElementById(`enc${i}`) as HTMLInputElement;
      if (!enc.value) {
        alert(`Introduzca el nombre del encargado ${i + 1}.`);
        encargados = [];
        return;
      }
      encargados.push(enc.value);
    }


    if (l < this.groups.length) {
      alert('Escoja más estaciones.');
      return;
    }

    for (let i = 1; i < this.groups.length; i++) {
      const prev = this.groups[i - 1];
      this.groups[i] = [];
      const ng = prev.slice(1);
      ng.push(prev[0]);
      for (let j = 0; j < l; j++) {
        this.groups[i][j] = this.newStage(ng[j]);
      }
    }

    const tour: Tour = {
      id: 1,
      nombre: name.value,
      estaciones: this.groups.slice(),
      estado: true,
      encargados: encargados
    };

    console.log(tour);
    this._myservice.tour = tour;


    // for (let i = 0; i < this.groups.length; i++) {
    // console.log(enc.value);

    // setTimeout(() => {
    // this._service.postGlobal('viajes', {
    //   encargado: enc.value,
    //   estaciones: this.groupsid[0]
    // }).subscribe((data: any) => {
    //   // console.log(data);
    //   console.log('Created trip', data.data.id);
    //   tour.viajes.push(data.data.id);
    // });
    // }, 50);
    // console.log(i + 1, rows);
    // }
    // setTimeout(() => {
    // console.log(tour);
    // this._service.postGlobal('tours', tour).subscribe((data: any) => {
    //   if (data.ok) {
    //     alert('Tour creado');
    //     this._router.navigate(['/main']);
    //   }
    // }, err => {
    //   console.log(err.error);
    // });
    // }, 1000);
  }

  selectStage(stage: Estacion, c, r) {
    if (!this.groups[0]) {
      this.groups[0] = [];
      // this.groupsid[0] = [];
    }
    this.groups[0].push(this.newStage(stage));
    // this.groupsid[0].push(stage.id);
    // console.log(stage, c, r);
  }

  newStage(stage: Estacion) {
    const s = new Estacion(`${Date.now()}${stage.codigo}`, stage.nombre, stage.encargado, stage.estado, stage.codigo);
    return s;
  }

  removeStage(gri) {
    this.groups[0].splice(gri, 1);
    // console.log(gri, gi);
  }

  showw() {
    console.log(this.groups);
  }

  times() {
    console.log(Date.now());
  }

}
