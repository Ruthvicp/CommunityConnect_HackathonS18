import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ChatPage } from '../pages/chat/chat';
import { AddRoomPage } from '../pages/add-room/add-room';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsLogin} from '../pages/tabs_login/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuthModule} from "angularfire2/auth";
import { AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {IonicStorageModule} from "@ionic/storage";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGM01zd1YqnsOvUZ8iru_fT27uIRPhb5c",
  authDomain: "driftersconnect.firebaseapp.com",
  databaseURL: "https://driftersconnect.firebaseio.com",
  projectId: "driftersconnect",
  storageBucket: "driftersconnect.appspot.com",
  messagingSenderId: "731019140792"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ChatPage,
    AddRoomPage,
    LoginPage,
    RegisterPage,
    TabsLogin
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ChatPage,
    AddRoomPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    TabsLogin
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
