import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public selected: string = 'tours';

  constructor() { }

  ngOnInit() {
  }

  public select = (id: string) => {
    this.selected = id;
  }

}
