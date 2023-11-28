import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FlightLogService } from '../core/services/flight-log.service';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { AirportService } from '../core/services/airport.service';
import { AirportVisit } from '../core/interfaces/airport-visit.interface';
import { Airport } from '../core/interfaces/airport.interface';

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
  belgiumCenter = fromLonLat([4.4699, 50.5039]);

  airportsVisited: AirportVisit[] = [];
  selectedVisitedAirport: AirportVisit | null = null
  airportData: Airport | null = null;

  map: Map | undefined;

  constructor(private flightLogService: FlightLogService, private airportServive: AirportService) { }

  ngOnInit(): void {
    this.flightLogService.getAirportsVisited().subscribe(airportsVisited => {
      this.airportsVisited = airportsVisited;
    });
    this.initMap();
  }

  onSelectAirport(event: CustomEvent): void {
    this.selectedVisitedAirport = event.detail.value;

    if (this.selectedVisitedAirport) {
      this.airportServive.getAiportDataByIdent(this.selectedVisitedAirport.airport).subscribe(airportData => {
        this.airportData = airportData
        this.flyToLocation(parseFloat(this.airportData?.longitude_deg ?? '0'), parseFloat(this.airportData?.latitude_deg ?? '0'));
      });
    }
  }

  private flyToLocation(longitude: number, latitude: number): void {
    const location = fromLonLat([longitude, latitude]);
    this.map?.getView().animate({
      center: location,
      duration: 1500,
      zoom: 11
    });
  }

  private initMap(): void {
    this.map = new Map({
      view: new View({
        center: this.belgiumCenter,
        zoom: 8,
      }),
      layers: [
        new TileLayer({
          source: this.customTileSource
        })
      ],
      target: 'map'
    });
  }

  private customTileSource = new XYZ({
    tileUrlFunction: (tileCoord) => {
      const z = tileCoord[0];
      const x = tileCoord[1];
      const y = tileCoord[2];
      return `/assets/tiles/merged/512/latest/${z}/${x}/${y}.png`;
    }
  });
}
