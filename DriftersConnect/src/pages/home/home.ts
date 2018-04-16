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

  user = "";
  postType: any ="";
  pMess: "";
  usersList: any[] = [];
  newsMessage: {};
  alarms: any[] = [];
  requests: any[] = [];
  news: any[] = [];
  userRef = firebase.database().ref("Users/").orderByKey();

  ionViewDidLoad() {
  this.showMap();
  }

showMap(){
const location = new google.maps.LatLng(39.0335539,-94.5760259);
const location1 = new google.maps.LatLng(38.9822282,-94.6707917);
const location2 = new google.maps.LatLng(39.0228485,-94.7151865);
const location3 = new google.maps.LatLng(38.9108408,-94.3821724);
const options = {center:location,zoom:10,streetViewControl:false}
const map = new google.maps.Map(this.mapElement.nativeElement, options);
this.addMarker(location,map);
this.addMarker(location1,map);
this.addMarker(location2,map);
this.addMarker(location3,map);

}

addMarker(position,map){
return new google.maps.Marker({
position,map});
}

  alarmRef = firebase.database().ref("Alarms/").orderByKey();
  reqRef = firebase.database().ref("userRequests/").orderByKey();
  newsRef = firebase.database().ref("News/").orderByKey();


  data = { nickname:"" };
  //constructor to initialize the objects
  constructor(private alertCtrl:AlertController, private ionStorage:Storage, public navCtrl: NavController,
              public  events:Events, public platform:Platform, public fireDatabase: AngularFireDatabase){

    this.navCtrl = navCtrl;
    this.events = events;
    console.log(this.usersList);
    this.setAlarmDisplay();
    this.setUserNewsDisplay();
    this.setUserRequestsDisplay();
    ionStorage.get("userName").then((val) => {
      this.user = val;
      //this.usersList = [];
      //var s = this.user;

      //console.log("the user logged in is "+ s);
      //console.log("the user logged in is " + this.userRef);

      //console.log("the user reference list is "+ this.usersList);
    });


  }

  alert(message: string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons: ['OK']
    }).present();
  }

  //func to post the user typed messages
  postMess() {
    if (this.postType != null) {
      this.newsMessage = {
        user: this.user,
        update: this.pMess
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
          this.setUserNewsDisplay();
          break;
        }
        case "requ":{
          this.fireDatabase.list('userRequests').push(this.newsMessage);
          console.log("Saved user Requests to Firebase!");
          alert(this.postType);
          this.setUserRequestsDisplay();
          break;
        }
        case "alar":{
          this.fireDatabase.list('Alarms').push(this.newsMessage);
          console.log("Saved Alarms to Firebase!");
          alert(this.postType);
          this.setAlarmDisplay();
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

  //Displays the user entered news updates
  setUserNewsDisplay(){
    this.news = [];
    console.log("Inside Setting News update");
    var that = this;
    this.newsRef.on('child_added', function(data) {
      that.news.push(data.val().update);
      console.log("Setting news Updates to - "+data.val().update);
    });
  }

  //Displays the user entered requests
  setUserRequestsDisplay(){
    this.requests = [];
    console.log("Inside Setting user requests");
    var that = this;
    this.reqRef.on('child_added', function(data) {
      that.requests.push(data.val().update);
      console.log("Setting user requests to - "+data.val().update);
    });
  }

  //Displays the user entered Alarms
  setAlarmDisplay(){
    this.alarms = [];
    console.log("Inside Setting Alarms");
    var that = this;
    this.alarmRef.on('child_added', function(data) {
      that.alarms.push(data.val().update);
      console.log("Setting Alarms to - "+data.val().update);
    });
  }

  //Displays the user details
   displayUserDetails(){
    var that = this;
    //console.log("Inside displayUserDetails func of home.ts");
    this.userRef.on('child_added', function(data) {
      that.usersList.push(data.val());
    });
  }


  //logs user out

  logout() {
    this.events.publish('user:logout', true, Date.now());
  }

  enterNickname() {
  this.navCtrl.setRoot(ContactPage, {
    //nickname: this.data.nickname
    nickname: this.user
  });
}

}
