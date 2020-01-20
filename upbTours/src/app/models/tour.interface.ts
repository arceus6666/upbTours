import { Viaje } from './viaje.interface';
import { Estacion } from './estacion.interface';

export interface Tour {
  id: number;
  nombre: string;
  estaciones: Array<Array<Estacion>>;
  encargados: Array<string>;
  estado: boolean;
}
