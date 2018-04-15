import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, Events, NavController, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import firebase from 'firebase';
import {Observable} from "rxjs/Observable";
import { ContactPage } from  '../contact/contact';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  user = "";
  postType: any;
  pMess: "";
  usersList: any[] = [];
  userRef = firebase.database().ref("Users/").orderByKey();

  data = { nickname:"" };

  constructor(private alertCtrl:AlertController, private ionStorage:Storage, public navCtrl: NavController, public  events:Events, public platform:Platform){
    this.navCtrl = navCtrl;
    this.events = events;
    console.log(this.usersList);

    ionStorage.get("userName").then((val) => {
      this.user = val;
      //this.usersList = [];
      //var s = this.user;

      //console.log("the user logged in is "+ s);
      //console.log("the user logged in is " + this.userRef);

      //console.log("the user reference list is "+ this.usersList);
    });


    platform.ready().then(() => {
      this.initMap();
    });
  }

  alert(message: string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons: ['OK']
    }).present();
  }

  postMess(){
    if(this.postType != null)
    {
      alert(this.postType);
    }

    console.log(this.usersList);
  }

  displayUserDetails(){
    var that = this;
    //console.log("Inside displayUserDetails func of home.ts");
    this.userRef.on('child_added', function(data) {
      that.usersList.push(data.val());
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
  
  enterNickname() {
  this.navCtrl.setRoot(ContactPage, {
    nickname: this.data.nickname
  });
}

}
