import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsLogin} from '../pages/tabs_login/tabs';
import { Events } from 'ionic-angular';
import {TabsPage} from "../pages/tabs/tabs";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase';

/*const config = {
  apiKey: "AIzaSyAGM01zd1YqnsOvUZ8iru_fT27uIRPhb5c",
  authDomain: "driftersconnect.firebaseapp.com",
  databaseURL: "https://driftersconnect.firebaseio.com",
  projectId: "driftersconnect",
  storageBucket: "driftersconnect.appspot.com",
  messagingSenderId: "731019140792"
};
*/

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsLogin;

  constructor(private fire: AngularFireAuth,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


    });

    events.subscribe('user:login', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)
      if(user)
      {
        this.rootPage = TabsPage;
      }
    });

    events.subscribe('user:logout', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)
      if(user)
      {
        this.rootPage = TabsLogin;
      }
    });

    /*const unsubscribe = fire.auth.onAuthStateChanged(user => {
      if (!user) {
        //this.rootPage = 'LoginPage';
        this.rootPage = 'TabsLogin';
        unsubscribe();
      } else {
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });*/
    
      //firebase.initializeApp(config);
  }
}
