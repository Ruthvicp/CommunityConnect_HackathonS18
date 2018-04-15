import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import { AngularFireDatabaseModule} from "angularfire2/database";
import {isSuccess} from "@angular/http/src/http_utils";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user ="";
  pass ="";

  constructor(private ionStorage:Storage, private fireDatabase: AngularFireDatabaseModule, private alertCtrl:AlertController,private fire: AngularFireAuth, public navCtrl: NavController, public events: Events) {
    this.navCtrl = navCtrl;
    this.events = events;
  }


  goToHome() {
    this.events.publish('user:login', true, Date.now());
    //this.navCtrl.push(HomePage);
  }

  alert(message: string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons: ['OK']
    }).present();
  }

  signinUser() {
    if (this.user.valueOf() != "" && this.pass.valueOf() != "") {
      this.fire.auth.signInWithEmailAndPassword(this.user.valueOf(), this.pass.valueOf()).then(data => {
        console.log("got data from Firebase ", data);
        //this.alert("You are logged in !");
        this.ionStorage.set('userName',this.user.valueOf());
        this.navCtrl.push(HomePage);

      }).catch(error => {
        console.log("error in registeration : ", error);
        this.alert(error.message);
      });

      console.log("will register using credentials : username is " + this.user + " and psw is " + this.pass)
    }
    else
    {
      this.alert("Please fill out all details!")
    }
  }
}
