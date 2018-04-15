import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user ="";
  pass ="";

  constructor(private ionStorage:Storage, private alertCtrl:AlertController,
              private fire: AngularFireAuth, public navCtrl: NavController, public events: Events) {
    this.navCtrl = navCtrl;
    this.events = events;
  }


  goToHome() {
    this.events.publish('user:login', true, Date.now());
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
        //console.log("got data from Firebase ", data);
        this.ionStorage.set('userName',this.user.valueOf());
        this.goToHome();
      }).catch(error => {
        console.log("error in registeration : ", error);
        this.alert(error.message);
      });

      console.log("will register using credentials : username is " + this.user);
    }
    else
    {
      this.alert("Please fill out all details!");
    }
  }
}
