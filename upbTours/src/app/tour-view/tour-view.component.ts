// tslint:disable: forin

import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Tour } from '../models/tour.interface';
import { Estacion } from '../models/estacion.interface';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.css']
})
export class TourViewComponent implements OnInit, OnChanges {

  @Input() currentTour: Tour;
  @Output() stageClick = new EventEmitter;
  // viajeInicial: Viaje;
  // estaciones: Array<Viaje> = null;
  // estaciones: Array<Estacion> = null;
  // retrievedStages = false;
  // l: number = 0;
  // maxEstaciones: number;
  empty: Array<any>;

  constructor(
    private _service: ApiService,
    private _appService: AppService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*
    Called before any other lifecycle hook. Use it to inject dependencies,
    but avoid any serious work here.
    Add '${implements OnChanges}' to the class.
    */
    // console.log(changes);
    const newCurrentTour = changes.currentTour.currentValue;
    // let maxEstaciones = 0;
    // console.log(newCurrentTour);
    if (newCurrentTour === null) {
      this.empty = null;
      return;
    }
    this.currentTour = newCurrentTour;
    this.empty = new Array(newCurrentTour.estaciones[0].length);
  }

  cellPressed(estacion: Estacion, stage: number, trip: number, type: string) {
    // console.log(this.currentTour.estaciones[trip][stage]);
    if (typeof estacion !== 'undefined') {
      estacion.estado = type;
      this.stageClick.emit({ estacion, stage, trip });
    }
    // setTimeout(() => {
    // }, 1000);
  }

  checkStage(estacion: Estacion) {
    const est = estacion.estado;
    switch (est) {
      case 'camino':
        return '#ffc107';
      case 'sala':
        return 'blue';
      case 'paso':
        return 'green';
      case 'cancelado':
        return 'red';
      default:
        return 'white';
    }
    // return 'red';
  }

  current() {
    console.log(this.currentTour.estaciones);
  }

}
