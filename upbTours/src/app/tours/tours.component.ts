import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Tour } from '../models/tour.interface';
import { Estacion } from '../models/estacion.interface';
import { Viaje } from '../models/viaje.interface';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  public tours: Array<Tour> = null;
  public groups: Array<number> = null;
  // public estaciones: Array<Estacion> = null;
  public estacionesShow: Array<Array<Estacion>> = null;
  public el = 0;
  public ll = 0;
  constructor(
    private _service: ApiService
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

  public setGroups = (g: string) => {
    const gg = parseInt(g, 10);
    // console.log(g)
    document.getElementById('gi').hidden = true;
    document.getElementById('gb').hidden = true;
    this.groups = new Array(gg);
    // console.log(this.groups);
  }

  public showResults = () => {
    const name = document.getElementById('tourName') as HTMLInputElement;
    const tour = {
      nombre: name.value,
      viajes: []
    };
    for (let i = 0; i < this.groups.length; i++) {
      const enc = document.getElementById(`enc${i}`) as HTMLInputElement;
      // console.log(enc.value);
      const viaje = {
        encargado: enc.value,
        estaciones: []
      };
      // const est = [];

      for (let k = 0, c = 0; k < this.el; k++) {
        for (let j = 0; j < 6 && c < this.ll; j++) {
          const e = document.getElementById(`check${i}:${j}${k}`) as HTMLInputElement;
          if (e.checked) {
            viaje.estaciones.push(this.estacionesShow[k][j].id);
            console.log(this.estacionesShow[k][j])
          }
          // console.log(c, e.checked);
          c++;
        }
      }
      // tour.viajes.push(i);
      console.log(viaje);
      // this._service.postGlobal('viajes', viaje).subscribe((data: any) => {
      //   // console.log(data);
      //   tour.viajes.push(data.data.id);
      // });

      // console.log(i + 1, rows);
    }
    // console.log(tour)
    // this._service.postGlobal('tours', tour).subscribe((data: any) => {
    //   if (data.ok) {
    //     alert('Tour creado');
    //   }
    // }, err => {
    //   console.log(err.error);
    // });
  }

}
