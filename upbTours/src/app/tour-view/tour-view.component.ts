// tslint:disable: forin

import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Tour } from '../models/tour.interface';
import { Viaje } from '../models/viaje.interface';

@Component({
  selector: 'app-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.css']
})
export class TourViewComponent implements OnInit {

  @Input() currentTour: Tour;
  // public viajeInicial: Viaje;
  public viajes: Array<Viaje>;
  public l: number;
  // public maxEstaciones: number;
  public empty;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    /*
      Called before any other lifecycle hook. Use it to inject dependencies,
      but avoid any serious work here.
      Add '${implements OnChanges}' to the class.
    */
    const newCurrentTour = changes.currentTour.currentValue;
    this.l = newCurrentTour.viajes.length;
    // this.viajeInicial = newCurrentTour.viajes[0];
    const vv = newCurrentTour.viajes;
    this.viajes = newCurrentTour.viajes;
    let maxEstaciones = 0;
    for (const v in vv) {
      const estaciones = vv[v].estaciones.length;
      maxEstaciones = estaciones > maxEstaciones ? estaciones : maxEstaciones;
    }
    this.empty = new Array(maxEstaciones);
  }

  public cellPressed = (viaje: Viaje, index: number) => {
    console.log(viaje, index);
  }

}
