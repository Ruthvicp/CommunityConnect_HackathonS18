import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, Events, NavController, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import firebase from 'firebase';
import {Observable} from "rxjs/Observable";

import { ContactPage } from  '../contact/contact';

import { AngularFireDatabaseModule, AngularFireDatabase} from "angularfire2/database";


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  user = "";
  postType: any ="";
  pMess: "";
  usersList: any[] = [];
  newsMessage: {};
  userRef = firebase.database().ref("Users/").orderByKey();


  data = { nickname:"" };


  constructor(private alertCtrl:AlertController, private ionStorage:Storage, public navCtrl: NavController,
              public  events:Events, public platform:Platform, public fireDatabase: AngularFireDatabase){

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

  postMess() {
    if (this.postType != null) {
      this.newsMessage = {
        user: this.user,
        newsUpdate: this.pMess
      };
      /*
      if (this.postType == "mess") {
        this.fireDatabase.list('News').push(this.newsMessage);
        console.log("Saved your News/Updates to Firebase!");
      }
      else if (this.postType == "requ") {
        this.fireDatabase.list('userRequests').push(this.newsMessage);
        console.log("Saved user Requests to Firebase!");
        alert(this.postType);
      }
      else if (this.postType == "alar") {
        this.fireDatabase.list('Alarms').push(this.newsMessage);
        console.log("Saved Alarms to Firebase!");
        alert(this.postType);
      }else {
        console.log("Select one of the types to post");
        alert("Select one of the types to post");
      } */

      switch (this.postType){
        case "mess":{
          this.fireDatabase.list('News').push(this.newsMessage);
          console.log("Saved your News/Updates to Firebase!");
          alert(this.postType);
          break;
        }
        case "requ":{
          this.fireDatabase.list('userRequests').push(this.newsMessage);
          console.log("Saved user Requests to Firebase!");
          alert(this.postType);
          break;
        }
        case "alar":{
          this.fireDatabase.list('Alarms').push(this.newsMessage);
          console.log("Saved Alarms to Firebase!");
          alert(this.postType);
          break;
        }
        default:{
          console.log("Kindly select one of the types to post");
          alert("Select one of the types to post");
          break;
        }
      }
      // console.log(this.usersList);
    }
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
