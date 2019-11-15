import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selected: string = 'none';

  constructor() { }

  ngOnInit() {
  }

  select(id: string) {
    this.selected = id;
  }

}
