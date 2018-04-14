import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {LoginPage} from "../login/login";


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

  constructor(private  alertCtrl:AlertController,private fire: AngularFireAuth, public navCtrl: NavController) {

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
        this.fire.auth.createUserWithEmailAndPassword(this.username.valueOf(), this.psw.valueOf()).then(data =>{
          console.log("Got data from Firebase: ", data);
          this.alert("You are logged in!")
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
