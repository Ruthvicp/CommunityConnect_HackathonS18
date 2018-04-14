import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  username = "";
  psw ="";

  constructor(private  alertCtrl:AlertController,private fire: AngularFireAuth, public navCtrl: NavController) {

  }

  alert(message: String){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:'message',
      buttons: ['OK']
    }).present();
  }

  registerUser(){
    this.fire.auth.createUserWithEmailAndPassword(this.username.valueOf(), this.psw.valueOf()).then(data =>{
      console.log("got data from Firebase : ", data);
      this.alert("You are logged in !")
      this.navCtrl.push(HomePage);

    }).catch(error =>{
      console.log("error in registeration : ", error);

    });
    console.log("will register using credentials : username is "+ this.username +" and psw is "+this.psw )


}

}
