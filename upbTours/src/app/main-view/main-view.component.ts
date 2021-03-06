import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Tour } from '../models/tour.interface';

import { Estacion } from '../models/estacion.interface';
import { ToursService } from '../tours/tours.service';
import { DataResponse } from '../models/dataresponse.interface';
import { AppService } from '../app.service';

// tslint:disable: forin

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit, OnDestroy {

  tours: Array<Tour> = null;
  // tours: any = null;
  showTours: Array<Tour> = null;
  currentTour: Tour = null;
  // currentFilter: string = '';
  badFilter: boolean = false;

  testtext = 'empty';

  interval = null;

  constructor(
    public _apiService: ApiService,
    public _appService: AppService
    // private _toursService: ToursService
  ) { }

  ngOnInit() {
    this._apiService.getGlobal('tours').subscribe(async (data: DataResponse) => {
      // console.log(data);
      const locals = await data.data;
      if (locals !== null && locals.length > 0) {
        this.currentTour = locals[0];
        this.tours = locals;
        this.showTours = locals;
      }
    });
    this.interval = setInterval(() => this.update(this._apiService), 10000);
    // console.log(locals);
    // this.tours = this._service.getGlobal('tours')
    //  .pipe(map((data: { ok: boolean, msg: string, data: Array<Tour> }) => data.data));
    // console.log(this.tours)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  filter(txt: string) {
    txt = this.clean(txt);
    // this.currentFilter = txt;
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
    this._apiService.putGlobal(
      `tours/${this.currentTour.id}`,
      this.currentTour
    ).subscribe((data: DataResponse) => {
      console.log(data);
    });
  }

  private update(service: ApiService) {
    console.log('update');
    service.getGlobal('tours').subscribe(async (data: DataResponse) => {
      const locals = await data.data;
      if (locals !== null && locals.length > 0) {
        this.currentTour = locals[0];
        this.tours = locals;
        this.showTours = locals;
      }
    });
  }

  delete() {
    this._apiService.deleteGlobal(`tours/${this.currentTour.id}`).subscribe((data: DataResponse) => {
      if (data.ok) {
        const name = this.currentTour.nombre;
        const id = this.currentTour.id;
        this.tours = this.tours.filter(t => t.id !== id);
        this.showTours = this.showTours.filter(t => t.id !== id);
        if (this.showTours.length === 0) {
          this.showTours = this.tours;
        }
        if (this.showTours.length > 0) {
          this.currentTour = this.showTours[0];
        } else {
          this.showTours = null;
          this.currentTour = null;
        }
        alert(`Tour "${name}" eliminado.`);
      } else {
        alert('Error. Intente de nuevo más tarde.');
      }
    });
  }

}
