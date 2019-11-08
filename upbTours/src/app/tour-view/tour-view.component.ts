// tslint:disable: forin

import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Tour } from '../models/tour.interface';
import { Viaje } from '../models/viaje.interface';
import { Estacion } from '../models/estacion.interface';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.css']
})
export class TourViewComponent implements OnInit {

  @Input() currentTour: Tour;
  @Output() stageClick = new EventEmitter;
  // public viajeInicial: Viaje;
  public viajes: Array<Viaje> = null;
  public estaciones: Array<Estacion> = null;
  public retrievedStages = false;
  public l: number = 0;
  // public maxEstaciones: number;
  public empty;

  constructor(
    private _service: ApiService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*
    Called before any other lifecycle hook. Use it to inject dependencies,
    but avoid any serious work here.
    Add '${implements OnChanges}' to the class.
    */
    const newCurrentTour = changes.currentTour.currentValue;
    this.getTrips(newCurrentTour);
    setTimeout(() => {
      // console.log(this.viajes);

      this.l = this.viajes.length;
      // this.viajeInicial = newCurrentTour.viajes[0];
      const vv = this.viajes;
      // this.viajes = newCurrentTour.viajes;
      let maxEstaciones = 0;
      for (const v in vv) {
        const estaciones = vv[v].estaciones.length;
        maxEstaciones = estaciones > maxEstaciones ? estaciones : maxEstaciones;
      }
      this.empty = new Array(maxEstaciones);
      this.getStages();
    }, 100);
  }

  public getTrips = async (tour: Tour) => {
    this.viajes = await [];
    for (const v in tour.viajes) {
      await this._service.getGlobal(`viajes/${tour.viajes[v]}`).subscribe(async (data: any) => {
        await this.viajes.push(data.data);
      });
    }
  }

  public getStages = async () => {
    // console.log(id);
    this.estaciones = [];
    const st = [];
    await this.viajes.forEach((v: Viaje) => {
      st.push(...v.estaciones);
    });
    // await this.viajes.forEach(v => {
    //   v.estaciones.forEach(e => {
    //     this._service.getGlobal(`estaciones/${e}`).subscribe((data: any) => {
    //       const est: Estacion = data.data;
    //       this.estaciones.push(est);
    //     });
    //   });
    // });
    await this._service.getGlobal('estaciones').subscribe(async (data: any) => {
      const est: Array<Estacion> = data.data;
      this.estaciones = await est.filter(e => {
        return st.includes(e.id);
      });
      this.retrievedStages = true;
    });
  }

  public getStage = async (id) => {
    return this.estaciones.find(e => e.id === id);
  }

  public cellPressed = (viaje: Viaje, i: number, j: number) => {
    const e = viaje.estaciones[i];
    console.log(viaje)
    if (typeof e !== 'undefined') {
      this._service.getGlobal(`estaciones/${e}`).subscribe((data: any) => {
        const est: Estacion = data.data;
        // console.log(e, est, i, j);
        est.ocupado = !est.ocupado;
        // this.stageClick.emit({ id: viaje.estaciones[i].id, status: this.viajes[j].estaciones[i].ocupado });
      });
    }
    // setTimeout(() => {
    // }, 1000);
  }

  public checkStage(estacion: Estacion) {
    // console.log(estacion)
    if (typeof estacion === 'undefined') {
      return 'white';
    }
    // } else {
    // this._service.getGlobal(`estaciones/${estacion.id}`).subscribe((data: any) => {
    //   const est: Estacion = data.data;
    if (typeof this.estaciones[estacion.id] === 'undefined') {
      return 'white';
    }
    return this.estaciones[estacion.id].ocupado ? 'red' : 'green';
    // });
    // }
    // console.log(estacion);
    // return 'gray';
  }

}
