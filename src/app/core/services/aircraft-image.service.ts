import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { ImageCacheEntry } from '../interfaces/image-cache-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class AircraftImageService {

  DEFAULT_URL = 'https://cdn.jetphotos.com/full/6/63853_1493621091.jpg';

  imageCache: { [aircraftRegistration: string]: ImageCacheEntry } = {};
  cacheDuration = 3600000;

  constructor(private http: HttpClient) { }

  getImageForAircraft(aircraftRegistration: string): Observable<string> {
    const currentTime = new Date().getTime();
    const cacheEntry = this.imageCache[aircraftRegistration];

    if (cacheEntry && cacheEntry.expirationTime > currentTime) {
      return of(cacheEntry.imageUrl);
    }

    return this.fetchImageForAircraft(aircraftRegistration).pipe(
      map(imageUrl => {
        this.imageCache[aircraftRegistration] = {
          imageUrl: imageUrl,
          expirationTime: currentTime + this.cacheDuration
        };
        return imageUrl
      })
    );

  }

  private fetchImageForAircraft(query: string): Observable<string> {
    query = query.slice(0, 2) + '-' + query.slice(2);
    const endpoint = `https://corsproxy.io/?https://www.jetphotos.com/photo/keyword/${query}`;
    return this.http.get(endpoint, { responseType: 'text' }).pipe(
      map(html => {
        const image = this.extractImageSource(html);

        if (!image) {
          return this.DEFAULT_URL;
        }

        let split = image.split('/');
        let id = split[split.length - 2] + '/' + split[split.length - 1];

        return `https://corsproxy.io/?https://cdn.jetphotos.com/full/${id}`;
      })
    );
  }

  private extractImageSource(html: string): string | undefined {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const imageContainers = doc.querySelectorAll('.result__photoLink');

    const imageContainer = imageContainers[0];

    if (!imageContainer?.querySelector('img')?.src) {
      return undefined;
    }

    return imageContainer?.querySelector('img')?.src;
  }
}
