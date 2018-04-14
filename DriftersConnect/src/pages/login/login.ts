import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {isSuccess} from "@angular/http/src/http_utils";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user ="";
  pass ="";

  constructor(private  alertCtrl:AlertController,private fire: AngularFireAuth, public navCtrl: NavController, public events: Events) {
    this.navCtrl = navCtrl;
    this.events = events;
  }

  goToHome() {
    this.events.publish('user:login', true, Date.now());
    //this.navCtrl.push(HomePage);
  }

  alert(message: String){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:'message',
      buttons: ['OK']
    }).present();
  }

  signinUser(){
    this.fire.auth.signInWithEmailAndPassword(this.user.valueOf(), this.pass.valueOf()).then(data =>{
      console.log("got data from Firebase ", data);
      this.alert("You are logged in !")
      this.navCtrl.push(HomePage);

    }).catch(error =>{
      console.log("error in registeration : ", error);
      this.alert(error.message);
    });

    console.log("will register using credentials : username is "+ this.user +" and psw is "+this.pass )
  }
}
