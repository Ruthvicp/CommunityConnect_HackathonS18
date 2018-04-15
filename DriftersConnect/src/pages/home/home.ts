import {Component, ElementRef, ViewChild} from '@angular/core';
import {Events, NavController, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  user = "";
  usersList:Array<any>;
  userRef = firebase.database().ref("Users/").orderByKey();

  constructor(private ionStorage:Storage, public navCtrl: NavController, public  events:Events, public platform:Platform){
    this.navCtrl = navCtrl;
    this.events = events;

    ionStorage.get("userName").then((val) => {
      this.user = val;
      //var s = this.user;

      //console.log("the user logged in is "+ s);
      //console.log("the user logged in is " + this.userRef);

      //console.log("the user reference list is "+ this.usersList);
    });


    platform.ready().then(() => {
      this.initMap();
    });
  }

  displayUserDetails(){
    console.log("Inside displayUserDetails func of home.ts");
    this.userRef.on('child_added', function(data) {
      console.log(data.val().fname, data.val().lname);
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
