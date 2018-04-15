import { Component } from '@angular/core';
import {Events, NavController, NavParams, Platform} from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatPage } from '../chat/chat';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

rooms = [];
ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public navParams: NavParams) {
    this.navCtrl = navCtrl;
    this.events = events;

     this.ref.on('value', resp => {
    this.rooms = [];
    this.rooms = snapshotToArray(resp);
  });

 /*   platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    statusBar.styleDefault();
    splashScreen.hide();
  }); */
  //firebase.initializeApp(config);
  }

  addRoom() {
  this.navCtrl.push(AddRoomPage);
}

joinRoom(key) {
  this.navCtrl.setRoot(ChatPage, {
    key:key,
    nickname:this.navParams.get("nickname")
  });
}

  logout() {
    this.events.publish('user:logout', true, Date.now());
  }
}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
