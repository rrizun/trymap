import { Component } from '@angular/core';
import { latLng, tileLayer, marker, latLngBounds, LatLngExpression, LatLng, Map } from 'leaflet';

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
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    // zoom: 12,
    // center: latLng(33.121944, -117.296944)
  };

  private map: Map;

  ngOnInit() {

    // latLngBounds(this.coords);

    // this.layers = [

    // ]


  }

  foo(coord: LatLngExpression) {
    return marker(coord);
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addRandomLatLng();
    this.doFitBounds();
    this.map.setZoom(5);
  }

  addRandomLatLng() {
    this.coords.push([this.random(150), this.random(300)]);
    this.doFitBounds();
  }

  random(s: number): number {
    return s*Math.random()-s/2;
  }

  doFitBounds() {
    this.map.fitBounds(latLngBounds(this.coords))
  }

}
