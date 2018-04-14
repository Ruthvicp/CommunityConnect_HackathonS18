import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  username = "";
psw ="";

  constructor(private fire: AngularFireAuth, public navCtrl: NavController) {

  }

  registerUser(){
    this.fire.auth.createUserWithEmailAndPassword(this.username.valueOf(), this.psw.valueOf()).then(data =>{
      console.log("got data from Firebase : ", data);

    }).catch(error =>{
      console.log("error in registeration : ", error);

    });
    console.log("will register using credentials : username is "+ this.username +" and psw is "+this.psw )


}

}
