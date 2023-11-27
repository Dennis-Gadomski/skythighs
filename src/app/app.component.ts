import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
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
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      document.body.classList.toggle('dark', true);
    });
    document.body.classList.toggle('dark', true);
  }
}
