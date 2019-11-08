import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Tour } from '../models/tour.interface';
import { Viaje } from '../models/viaje.interface';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public tours: Array<Tour> = null;
  public showTours: Array<Tour> = null;
  public currentTour: Tour = null;

  constructor(
    private _service: ApiService
  ) { }

  ngOnInit() {
    this._service.getGlobal('tours').subscribe(async (data: { ok: boolean, msg: string, data: any }) => {
      this.tours = await data.data;
      // console.log(this.tours);
      this.showTours = await this.tours;
      this.currentTour = await this.showTours[0];
    });
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

  public stageChange = (event) => {
    const idEstacion = event.id;

    console.log(event);
  }

}
