import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Cars', url: '/autos', icon: 'car' },
    { title:'Registry' , url: '/registry', icon: 'receipt'},
    { title:'Price' , url: '/price', icon: 'cash'},
    { title: 'Data User', url: '/data', icon: 'server' },

  ];
  constructor() {}
}