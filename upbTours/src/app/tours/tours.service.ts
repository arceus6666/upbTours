import { Injectable } from '@angular/core';
import { IEstacion } from '../models/estacion.interface';
import { ApiService } from '../api.service';
import { Tour } from '../models/tour.interface';
import { DataResponse } from '../models/dataresponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private estacionesDefault: Array<IEstacion>;

  constructor(private _service: ApiService) {
    this.estacionesDefault = [
      {
        id: null,
        nombre: 'Lab. Multimedia',
        encargado: 'Victor Hugo Huanca',
        estado: 'previsto',
        codigo: 'LM',
      },
      {
        id: null,
        nombre: 'Aula Prisma',
        encargado: 'Alexis Marechal',
        estado: 'previsto',
        codigo: 'AP',
      },
      {
        id: null,
        nombre: 'Lab. Física',
        encargado: 'Jose Luis Vera',
        estado: 'previsto',
        codigo: 'LB',
      },
      {
        id: null,
        nombre: 'Lab. Aceros',
        encargado: 'Alvaro Moscoso',
        estado: 'previsto',
        codigo: 'LA',
      },
      {
        id: null,
        nombre: 'Lab. Química',
        encargado: 'Keylly Loayza',
        estado: 'previsto',
        codigo: 'LQ',
      },
      {
        id: null,
        nombre: 'Sala Gessell',
        encargado: 'Carmen Gonzales',
        estado: 'previsto',
        codigo: 'SG',
      },
      {
        id: null,
        nombre: 'Cafetería',
        encargado: 'Staff',
        estado: 'previsto',
        codigo: 'CF',
      },
      {
        id: null,
        nombre: 'Auditorio',
        encargado: 'DAAE',
        estado: 'previsto',
        codigo: 'AD',
      },
      {
        id: null,
        nombre: 'Salón de Eventos',
        encargado: 'Sebastian LLovet',
        estado: 'previsto',
        codigo: 'SE',
      },
      {
        id: null,
        nombre: 'Aula Financiera',
        encargado: '---',
        estado: 'previsto',
        codigo: 'AF',
      },
      {
        id: null,
        nombre: 'Diseño Gráfico',
        encargado: 'Pablo Romero',
        estado: 'previsto',
        codigo: 'DG',
      },
      {
        id: null,
        nombre: 'Sala de Descanso',
        encargado: 'DAEE',
        estado: 'previsto',
        codigo: 'SD',
      },
      {
        id: null,
        nombre: 'Aula L6',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L6',
      },
      {
        id: null,
        nombre: 'Aula A3',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A3',
      },
      {
        id: null,
        nombre: 'Aula A4',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A4',
      },
      {
        id: null,
        nombre: 'Aula A15',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A15',
      },
      {
        id: null,
        nombre: 'Aula L5',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L5',
      },
      {
        id: null,
        nombre: 'Aula L3',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L3',
      },
      {
        id: null,
        nombre: 'Aula A6',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A6',
      },
      {
        id: null,
        nombre: 'Aula L2',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L2',
      },
      {
        id: null,
        nombre: 'Aula A7',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A7',
      },
      {
        id: null,
        nombre: 'Aula L13',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L13',
      },
      {
        id: null,
        nombre: 'Aula A8',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A8',
      },
      {
        id: null,
        nombre: 'Aula L1',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L1',
      },
      {
        id: null,
        nombre: 'Aula L12',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L12',
      },
      {
        id: null,
        nombre: 'Aula A9',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A9',
      },
      {
        id: null,
        nombre: 'Aula A10',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A10',
      },
      {
        id: null,
        nombre: 'Aula L10',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L10',
      },
      {
        id: null,
        nombre: 'Aula L9',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L9',
      },
      {
        id: null,
        nombre: 'Aula A11',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A11',
      },
      {
        id: null,
        nombre: 'Aula A12',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A12',
      },
      {
        id: null,
        nombre: 'Aula A1',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A1',
      },
      {
        id: null,
        nombre: 'Aula L8',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L8',
      },
      {
        id: null,
        nombre: 'Aula A2',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A2',
      },
      {
        id: null,
        nombre: 'Aula A13',
        encargado: '---',
        estado: 'previsto',
        codigo: 'A13',
      },
      {
        id: null,
        nombre: 'Aula L7',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L7',
      },
      {
        id: null,
        nombre: 'Aula Oruro',
        encargado: '---',
        estado: 'previsto',
        codigo: 'AO',
      },
      {
        id: null,
        nombre: 'Aula Cochabamba',
        encargado: '---',
        estado: 'previsto',
        codigo: 'AC',
      },
      {
        id: null,
        nombre: 'Aula L11',
        encargado: '---',
        estado: 'previsto',
        codigo: 'L11',
      },
      {
        id: null,
        nombre: 'Lab. Comp. 1',
        encargado: '---',
        estado: 'previsto',
        codigo: 'LC1',
      },
      {
        id: null,
        nombre: 'Lab. Comp. 2',
        encargado: '---',
        estado: 'previsto',
        codigo: 'LC2',
      },
      {
        id: null,
        nombre: 'Lab. comp. 3',
        encargado: '---',
        estado: 'previsto',
        codigo: 'LC3',
      },
    ];
  }

  public getEstacionesDefault() {
    return this.estacionesDefault;
  }
}
