import { Injectable } from '@angular/core';
import { IEstacion } from '../models/estacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private estacionesDefault: Array<IEstacion>;
  public tour: any = null;

  constructor() {
    this.estacionesDefault = [
      {
        id: null,
        nombre: 'Lab. Multimedia',
        encargado: 'victor',
        estado: 'libre',
        codigo: 'lm',
      },
      {
        id: null,
        nombre: 'Prisma',
        encargado: '',
        estado: 'libre',
        codigo: 'ap',
      },
      {
        id: null,
        nombre: 'fisica',
        encargado: '',
        estado: 'libre',
        codigo: 'lf',
      },
      {
        id: null,
        nombre: 'aceros',
        encargado: '',
        estado: 'libre',
        codigo: 'la',
      },
      {
        id: null,
        nombre: 'qwe',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'asd',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'zxc',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'sdsd',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'zxcxz',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'dfgh',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'cvbcvb',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'xcvxcv',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'w3erwer',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'hgjty',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: 'yjytsrf',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
      {
        id: null,
        nombre: '',
        encargado: '',
        estado: 'libre',
        codigo: '',
      },
    ];
  }

  public getEstacionesDefault() {
    return this.estacionesDefault;
  }
}
