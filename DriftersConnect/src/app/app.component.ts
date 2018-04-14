import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsLogin} from '../pages/tabs_login/tabs';
import { Events } from 'ionic-angular';
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsLogin;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events) {
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
  }
}
