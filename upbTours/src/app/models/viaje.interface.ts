import { Estacion } from './estacion.interface';

export interface Viaje {
  encargado: string;
  estaciones: Array<Estacion>;
}
