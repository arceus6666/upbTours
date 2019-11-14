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
  // public viajes: Array<Viaje> = null;
  // public estaciones: Array<Estacion> = null;
  // public retrievedStages = false;
  // public l: number = 0;
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
    let maxEstaciones = 0;
    newCurrentTour.viajes.forEach(v => {
      const estaciones = v.estaciones.length;
      maxEstaciones = estaciones > maxEstaciones ? estaciones : maxEstaciones;
    });
    this.empty = new Array(maxEstaciones);
  }

  public cellPressed = (estacion: Estacion, stage: number, trip: number) => {
    // console.log(this.currentTour.viajes[trip].estaciones[stage]);
    if (typeof estacion !== 'undefined') {
      estacion.ocupado = !estacion.ocupado;
      this.stageClick.emit({ estacion, stage, trip });
    }
    // setTimeout(() => {
    // }, 1000);
  }

  public checkStage(estacion: Estacion) {
    // console.log(estacion)
    if (typeof estacion === 'undefined') {
      return 'white';
    } else {
      return estacion.ocupado ? 'red' : 'green';
    }
  }

}
