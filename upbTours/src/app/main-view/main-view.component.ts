import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Tour } from '../models/tour.interface';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public tours: Array<Tour>;
  public showTours: Array<Tour>;
  public currentTour: Tour;

  constructor(
    private _service: ApiService
  ) { }

  ngOnInit() {
    // this._service.getGlobal('tours/all').subscribe((data: any) => {
    //   this.tours = data.res;
    // });
    this.tours = [
      {
        nombre: 'Tour 1',
        viajes: [
          {
            encargado: 'Encargado 1a',
            estaciones: [
              { id: 1, nombre: 'Aula Prisma\nAlexis Marechal' },
              { id: 2, nombre: 'b' },
              { id: 3, nombre: 'c' },
              { id: 4, nombre: 'd' }
            ]
          },
          {
            encargado: 'Encargado 1b', estaciones: [
              { id: 5, nombre: 'q' },
              { id: 6, nombre: 'w' },
              { id: 7, nombre: 'e' }
            ]
          },
        ], estado: true
      },
      {
        nombre: 'Tour 2',
        viajes: [
          {
            encargado: 'Encargado 2',
            estaciones: [
              { id: 0, nombre: 'a' },
              { id: 2, nombre: 'b' },
              { id: 3, nombre: 'c' },
            ]
          }], estado: true
      },
      {
        nombre: 'Tour 3', viajes: [{
          encargado: 'Encargado 3', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 4', viajes: [{
          encargado: 'Encargado 4', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 5', viajes: [{
          encargado: 'Encargado 5', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 6a', viajes: [{
          encargado: 'Encargado 6a', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 6b', viajes: [{
          encargado: 'Encargado 6b', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 6c', viajes: [{
          encargado: 'Encargado 6c', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 6d', viajes: [{
          encargado: 'Encargado 6d', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 6e', viajes: [{
          encargado: 'Encargado 6e', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 6f', viajes: [{
          encargado: 'Encargado 6f', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 6g', viajes: [{
          encargado: 'Encargado 6g', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 6h', viajes: [{
          encargado: 'Encargado 6h', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
      {
        nombre: 'Tour 10', viajes: [{
          encargado: 'Encargado 10', estaciones: [
            { id: 0, nombre: 'a' },
            { id: 2, nombre: 'b' },
            { id: 3, nombre: 'c' },
          ]
        }], estado: true
      },
    ];
    this.showTours = this.tours;
    this.currentTour = this.showTours[0];
  }

  public filter = (txt: string) => {
    txt = this.clean(txt);
    // console.log(txt);
    this.showTours = this.tours.filter((tour: Tour) => this.clean(tour.nombre).indexOf(txt) !== -1);
    this.currentTour = this.showTours[0];
  }

  public clean = (str: string): string => {
    let res = str.toLowerCase();
    res = res.replace(/[àáäâ]/g, 'a');
    res = res.replace(/[èéëê]/g, 'e');
    res = res.replace(/[ìíïî]/g, 'i');
    res = res.replace(/[òóöô]/g, 'o');
    res = res.replace(/[ùúüû]/g, 'u');
    return res;
  }

  public selectTour = (index: number) => {
    this.currentTour = this.showTours[index];
  }

}
