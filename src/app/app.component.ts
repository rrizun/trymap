import { Component } from '@angular/core';
import { icon, latLngBounds, LatLngExpression, Map, marker, Marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trymap';

  coords: LatLngExpression[] = [
    // [46.879966, -121.726909],
    // [33.121944, -117.296944], // carlsbad
  ]

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '...' })
    ],
    // zoom: 12,
    // center: latLng(33.121944, -117.296944)
  };

  private map: Map;

  ngOnInit() {
    Marker.prototype.options.icon = icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    });
  }

  markers(): Marker[] {
    return this.coords.map((coord) => { return marker(coord) });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addRandomLatLng();
    this.doFitBounds();
  }

  addRandomLatLng() {
    this.coords.push([this.random(150), this.random(300)]);
    this.doFitBounds();
  }
  
  removeRandomLatLng() {
    this.coords.shift();
    this.doFitBounds();
  }

  random(s: number): number {
    return s*Math.random()-s/2;
  }

  doFitBounds() {
    this.map.fitBounds(latLngBounds(this.coords))
    if (this.coords.length==1)
      this.map.setZoom(9);
  }

}
