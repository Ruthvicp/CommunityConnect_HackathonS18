import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public events: Events) {
    this.navCtrl = navCtrl;
    this.events = events;
  }

  goToHome() {
    this.events.publish('user:login', true, Date.now());
    //this.navCtrl.push(HomePage);
  }
}
