import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Estacion } from './models/estacion.interface';
import { Viaje } from './models/viaje.interface';
import { Tour } from './models/tour.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public logged: boolean;
  private estaciones: Array<Estacion> = null;
  private viajes: Array<Viaje> = null;
  private tours: Array<Tour> = null;

  constructor(
    private _service: ApiService
  ) {
    this.logged = false;
    this._service.getGlobal('viajes').subscribe((data: any) => {
      
    });
  }
}
