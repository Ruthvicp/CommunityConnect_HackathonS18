import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public events: Events) {
    this.navCtrl = navCtrl;
    this.events = events;
  }

  logout() {
    this.events.publish('user:logout', true, Date.now());
  }
}
