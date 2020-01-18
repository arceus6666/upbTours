import { Injectable } from '@angular/core';
import { IEstacion } from '../models/estacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private estacionesDefault: Array<IEstacion>;

  constructor() {
    this.estacionesDefault = [
      {
        id: null,
        nombre: 'Lab. Multimedia',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: 'Prisma',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: 'fisica',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: 'aceros',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre'
      },
    ];
  }

  public getEstacionesDefault() {
    return this.estacionesDefault;
  }
}
