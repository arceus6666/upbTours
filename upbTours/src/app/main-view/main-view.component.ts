import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Tour } from '../models/tour.interface';

import { Estacion } from '../models/estacion.interface';
import { ToursService } from '../tours/tours.service';
import { DataResponse } from '../models/dataresponse.interface';

// tslint:disable: forin

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  tours: Array<Tour> = null;
  // tours: any = null;
  showTours: Array<Tour> = null;
  currentTour: Tour = null;
  currentFilter: string = '';
  badFilter: boolean = false;

  testtext = 'empty';

  constructor(
    private _service: ApiService,
    // private _toursService: ToursService
  ) { }

  ngOnInit() {
    // this._service.getGlobal('tours').subscribe(async (data: { ok: boolean, msg: string, data: Array<Tour> }) => {
    //   // console.log(data);
    //   this.tours = await data.data;
    //   // console.log(this.tours);
    //   this.showTours = await data.data;
    //   this.currentTour = await this.showTours[0];
    // });
    // let locals;
    this._service.getGlobal('tours').subscribe(async (data: DataResponse) => {
      // console.log(data);
      const locals = await data.data;
      if (locals !== null) {
        this.currentTour = locals[0];
        this.tours = locals;
        this.showTours = locals;
      }
    });
    // console.log(locals);
    // this.tours = this._service.getGlobal('tours').pipe(map((data: { ok: boolean, msg: string, data: Array<Tour> }) => data.data));
    // console.log(this.tours)
  }

  filter(txt: string) {
    txt = this.clean(txt);
    this.currentFilter = txt;
    // console.log(txt);
    const filtered = this.tours.filter(tour => this.clean(tour.nombre).indexOf(txt) !== -1);
    // console.log(filtered);
    // if () {
    //   this.badFilter = true;
    // } else {
    //   this.badFilter = false;
    // }
    this.badFilter = filtered.length === 0;
    this.showTours = filtered;
    this.currentTour = this.showTours[0] || null;
  }

  clean(str: string): string {
    let res = str.toLowerCase();
    res = res.replace(/[àáäâ]/g, 'a')
      .replace(/[èéëê]/g, 'e')
      .replace(/[ìíïî]/g, 'i')
      .replace(/[òóöô]/g, 'o')
      .replace(/[ùúüû]/g, 'u');
    // res = res.replace(/[èéëê]/g, 'e');
    // res = res.replace(/[ìíïî]/g, 'i');
    // res = res.replace(/[òóöô]/g, 'o');
    // res = res.replace(/[ùúüû]/g, 'u');
    return res;
  }

  selectTour(index: number) {
    // console.log(this.showTours[index]);
    this.currentTour = this.showTours[index];
  }

  stageChange(event: { estacion: Estacion, stage: number, trip: number }) {
    const stage = event.stage;
    const trip = event.trip;
    // console.log(this.currentTour.estaciones[trip][stage]);
    this.currentTour.estaciones[trip][stage] = event.estacion;
    this._service.putGlobal(`tours/${this.currentTour.id}`, this.currentTour).subscribe((data: DataResponse) => {
      console.log(data);
    });
    // this._service.putGlobal(`estaciones/${event.estacion.id}`, event.estacion).subscribe((data: any) => {
    //   if (data.ok) {
    //     for (const t in this.tours) {
    //       for (const v in this.tours[t].viajes) {
    //         for (const e in this.tours[t].viajes[v].estaciones) {
    //           if (this.tours[t].viajes[v].estaciones[e].id === event.estacion.id) {
    //             // console.log(t, v, e);
    //             this.tours[t].viajes[v].estaciones[e] = event.estacion;
    //           }
    //         }
    //       }
    //     }
    //     // this.tours[index].viajes[event.trip].estaciones[event.stage] = event.estacion;
    //     // this.filter(this.currentFilter);
    //     // this.currentTour = this.tours[index];
    //     alert('Estación actualizada!');
    //   }
    // });
    // console.log(event);
  }

  pt() {
    // this._service.postGlobal('tours/test', {});
  }

  update() {
    // this._toursService.texttest = 'changed';
  }

  delete() {
    // this._service.deleteGlobal('tours/1');
  }

}
