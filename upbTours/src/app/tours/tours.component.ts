import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Tour } from '../models/tour.interface';
import { Estacion } from '../models/estacion.interface';
import { Router } from '@angular/router';
// tslint:disable: forin

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  tours: Array<Tour> = null;
  groups: Array<Array<any>> = null;
  groupsid: Array<Array<any>> = null;
  // estaciones: Array<Estacion> = null;
  estacionesShow: Array<Array<Estacion>> = null;
  el = 0;
  ll = 0;
  constructor(
    private _service: ApiService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._service.getGlobal('tours').subscribe(async (data: { ok: boolean, msg: string, data: Array<Tour> }) => {
      // console.log(data);
      this.tours = await data.data;
    });
    this._service.getGlobal('estaciones').subscribe((data: any) => {
      const estaciones = data.data;
      let l = estaciones.length;
      this.ll = l;
      // console.log(l);
      l /= 6;
      l = parseInt(l, 10) + 1;
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
    });
  }

  setGroups(g: string) {
    const gg = parseInt(g, 10);
    // console.log(g)
    document.getElementById('gi').hidden = true;
    document.getElementById('gb').hidden = true;
    this.groups = new Array(gg);
    this.groupsid = new Array(gg);
    // console.log(this.groups);
  }

  showResults() {
    const name = document.getElementById('tourName') as HTMLInputElement;
    const tour = {
      nombre: name.value,
      viajes: []
    };
    for (let i = 0; i < this.groups.length; i++) {
      const enc = document.getElementById(`enc${i}`) as HTMLInputElement;
      // console.log(enc.value);

      setTimeout(() => {
        this._service.postGlobal('viajes', {
          encargado: enc.value,
          estaciones: this.groupsid[i]
        }).subscribe((data: any) => {
          // console.log(data);
          console.log('Created trip', data.data.id, i);
          tour.viajes.push(data.data.id);
        });
      }, 50);
      // console.log(i + 1, rows);
    }
    setTimeout(() => {
      // console.log(tour);
      this._service.postGlobal('tours', tour).subscribe((data: any) => {
        if (data.ok) {
          alert('Tour creado');
          this._router.navigate(['/main']);
        }
      }, err => {
        console.log(err.error);
      });
    }, 1000);
  }

  selectStage(stage: Estacion, c, r) {
    if (!this.groups[0]) {
      this.groups[0] = [];
      this.groupsid[0] = [];
    }
    this.groups[0].push(stage);
    this.groupsid[0].push(stage.id);
    console.log(stage, c, r);
  }

  removeStage(gri) {
    this.groups[0].splice(gri, 1);
    // console.log(gri, gi);
  }

}
