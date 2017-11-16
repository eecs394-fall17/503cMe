import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ImpactPage } from '../impact/impact';
import { ProfilePage } from '../profile/profile';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {

  favorites: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewWillEnter() {
    this.getFavorites();
  }

  switchTabs(id: string) {
    switch (id) {
      case "explore": {
        this.navCtrl.setRoot(HomePage);
        break;
      }
      case "impact": {
        this.navCtrl.setRoot(ImpactPage);
        break;
      }
      case "profile": {
        this.navCtrl.setRoot(ProfilePage);
        break;
      }
      default: {
        break;
      }
    }
  }

  getFavorites() {
    let res = [];
    let self = this;
    this.storage.get("test").then(bool => {
      if (bool) {
        self.favorites = "it works";
      } else {
        self.favorites = "shit";
      }
    });
  }

}
