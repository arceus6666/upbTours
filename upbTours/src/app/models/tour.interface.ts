import { Viaje } from './viaje.interface';

export interface Tour {
  id: number;
  nombre: string;
  viajes: Array<Viaje>;
  estado: boolean;
}
