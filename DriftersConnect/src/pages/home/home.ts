import {Component, ElementRef, ViewChild} from '@angular/core';
import {Events, NavController, Platform} from 'ionic-angular';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public events: Events, public platform:Platform) {
    this.navCtrl = navCtrl;
    this.events = events;

    platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
  }

  logout() {
    this.events.publish('user:logout', true, Date.now());
  }
}
