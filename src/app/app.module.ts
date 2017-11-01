import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DonatedPage } from '../pages/donated/donated';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyBVk4WXC62YrsOIVP36p-89eh1gVwHxZcA",
    authDomain: "cme-4f5c4.firebaseapp.com",
    databaseURL: "https://cme-4f5c4.firebaseio.com",
    projectId: "cme-4f5c4",
    storageBucket: "cme-4f5c4.appspot.com",
    messagingSenderId: "639950975877"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DonatedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DonatedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    [AngularFirestoreModule]
  ]
})
export class AppModule { }
