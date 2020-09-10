import { environment } from '../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map : mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  marker :mapboxgl.Marker;

  //The default location of Dubai center 
  defaultLat = 25.2303746;
  defaultLng = 55.2747425;

  @Input() lat?: number;
  @Input() lng?: number;
  @Input() setMarker: boolean;
  @Input() editable = false;
  @Output() moveMarker = new EventEmitter;

  constructor( private route : ActivatedRoute, ) { 
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  
  ngOnInit(): void {
    //Assign default coors in case if no location have been initially provided. Case of a new record.
    if (!this.setMarker){
      this.lat = this.defaultLat;
      this.lng = this.defaultLng;
    }
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    
    this.map.on('load', (event)=>{
      if (this.setMarker){
        this.marker = new mapboxgl.Marker({
          draggable : this.editable
        })
        this.marker.setLngLat([this.lng, this.lat])
        this.marker.addTo(this.map); // add the marker to the map
        this.marker.on('dragend', ()=>{
          var lngLat = this.marker.getLngLat();
          this.moveMarker.emit(lngLat);
        });
      }
    })

    this.map.on('click', (event)=>{
      //e.lngLat
      if (this.editable){
        if (!this.setMarker){
          this.marker = new mapboxgl.Marker({
            draggable : true
          })
          this.marker.setLngLat(event.lngLat)
          this.marker.addTo(this.map); // add the marker to the map
          this.marker.on('dragend', ()=>{
            var lngLat = this.marker.getLngLat();
            this.moveMarker.emit(lngLat);
          });
          this.setMarker = true;
        } else {
          this.marker.setLngLat(event.lngLat)
        }
      }
    });
  }
}
