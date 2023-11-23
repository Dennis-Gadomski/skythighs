import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Timeline', url: '/flight-time-line', icon: 'airplane' },
    { title: 'Map', url: '/map', icon: 'map' },
  ];
  constructor() { }
}
