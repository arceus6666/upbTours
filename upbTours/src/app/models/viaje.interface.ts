import { Estacion } from './estacion.interface';

export interface Viaje {
  id?: number;
  encargado: string;
  estaciones: Array<Estacion>;
}
