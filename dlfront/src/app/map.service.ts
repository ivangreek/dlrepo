import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number;
  lng: number;
  zoom = 12;

  constructor() { 
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }
  
}
