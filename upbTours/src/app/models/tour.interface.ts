import { Viaje } from './viaje.interface';

export interface Tour {
  nombre: string;
  viajes: Array<Viaje>;
  estado: boolean;
}
