import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {LoginPage} from "../login/login";

import { AngularFireDatabaseModule, AngularFireDatabase} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {FirebaseListObservable} from "angularfire2/database-deprecated";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  username = "";
  psw ="";
  fname = "";
  lname = "";
  address = "";
  zip = "";
  pswConfirm = "";

  user = {};

  constructor(private  alertCtrl:AlertController,private fire: AngularFireAuth,
              public navCtrl: NavController, public fireDatabase: AngularFireDatabase) {
    //this.fireDatabase.list('Users').push(this.user);
  }

  alert(message: string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle:message,
      buttons: ['OK']
    }).present();
  }

  registerUser(){
    if(this.username.valueOf() != "" && this.psw.valueOf() != "" && this.fname.valueOf() != "" && this.lname.valueOf() != ""
      && this.address.valueOf() != "" && this.zip.valueOf() != "" && this.pswConfirm.valueOf() != "")
    {
      if(this.pswConfirm.valueOf() == this.psw.valueOf())
      {
        this.user = {
          user:this.username,
          fname: this.fname,
          lname: this.lname,
          address: this.address,
          zip: this.zip
        };
        this.fire.auth.createUserWithEmailAndPassword(this.username.valueOf(), this.psw.valueOf()).then(data =>{
          this.fireDatabase.list('Users').push(this.user);
          //this.fireDatabase.list('Users');

          console.log("Got data from Firebase: ", data);
          this.alert("You are Registered in, You may log in now!")
          this.navCtrl.setRoot(LoginPage);

        }).catch(error =>{
          this.alert(error);
          console.log("error in registration : ", error);
        });
      }
      else
      {
        this.alert("Passwords do not match");
      }
    }
    else
    {
      this.alert("Please fill out all fields")
    }

    console.log("will register using credentials : username is "+ this.username +" and psw is "+this.psw )
  }
}
