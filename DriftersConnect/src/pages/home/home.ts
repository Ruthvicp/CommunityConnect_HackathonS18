import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, Events, NavController, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {AngularFireDatabase, AngularFireList, AngularFireDatabaseModule, snapshotChanges} from "angularfire2/database";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import firebase from 'firebase';
import {DatabaseSnapshot} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {LoginPage} from "../login/login";


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  user = "";

  users: {};

  files: Observable<any[]>;

  //var ref = firebase.database().ref("fname");
  usersList:Array<any>;
  //public userRef: firebase.database.Reference = firebase.database().ref("Users/");
   userRef = firebase.database().ref("Users/").orderByKey();
  //public userRef: firebase.database.Reference = firebase.database().ref("Users/-LA6Lcq90V-NwSHxstZb");

  constructor(private ionStorage:Storage,private  alertCtrl:AlertController,private fire: AngularFireAuth,
              public navCtrl: NavController, public fireDatabase: AngularFireDatabase, public  events:Events, public platform:Platform){
  //constructor(private ionStorage:Storage,public navCtrl: NavController, private fire: AngularFireAuth, private fireDatabase:AngularFireDatabase, public events: Events, public platform:Platform) {
    this.navCtrl = navCtrl;
    this.events = events;

    ionStorage.get("userName").then((val) => {
      this.user = val;
      var s=this.user;

      //this.users = fireDatabase.list("Users");

      //this.users = this.fireDatabase.list("Users");
      //this.users = this.fireDatabase.app.database().ref("Users").orderByKey().toString();
      console.log("the user logged in is "+ s);
      console.log("the user logged in is " + this.userRef);

      //.orderByChild("suyash").equalTo("6720").
      console.log("the user reference list is "+ this.usersList);
    });


    platform.ready().then(() => {
      this.initMap();
    });
  }

  displayUserDetails(userId){
    console.log("Inside displayUserDetails func of home.ts");
    /*
     console.log("Inside displayUserDetails func of home.ts");
    this.getDetails(userId).then(snapshot => {
      console.log("The f name obtained is - "+snapshot.val().fname);
    })
     */
    this.userRef.on('child_added', function(data) {
      console.log(data.val().fname, data.val().lname);
    });
  }

  /*
  getDetails(userId:any){
    console.log("Inside getDetails func of home.ts");
    var uName = this.userRef.child(userId);
    console.log("reference returns -  "+uName.once('value'))
    return uName.once('value');
  }
 */


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
