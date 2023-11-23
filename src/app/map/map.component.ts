import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FlightLogService } from '../core/services/flight-log.service';
import { FlightLog } from '../core/interfaces/flight-log.interface';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class MapComponent implements OnInit {
  flightLogs: FlightLog[] = [];
  map: Map | undefined;

  constructor(private flightLogService: FlightLogService) { }

  ngOnInit(): void {
    const belgiumCenter = fromLonLat([4.4699, 50.5039]);

    this.map = new Map({
      view: new View({
        center: belgiumCenter,
        zoom: 8,
      }),
      layers: [
        new TileLayer({
          source: this.customTileSource
        })
      ],
      target: 'map'
    });
    this.flightLogService.getFlightLogs().subscribe(flightLogs => {
      this.flightLogs = flightLogs;
    });
  }


  customTileSource = new XYZ({
    tileUrlFunction: function (tileCoord) {
      const z = tileCoord[0];
      const x = tileCoord[1];
      const y = tileCoord[2];
      return `/assets/tiles/merged/512/latest/${z}/${x}/${y}.png`;
    }
  });

}
