import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ImpactPage } from '../impact/impact';
import { ProfilePage } from '../profile/profile';
import { NpoPage } from '../npo/npo';

import { Storage } from '@ionic/storage';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {

  favorites: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public db: AngularFirestore) {

  }

  ionViewWillEnter() {
    this.getFavorites();
  }

  getFavorites() {
    this.favorites = [];
    let self = this;
    this.db.collection('npos').valueChanges().subscribe(npos => {
      npos.forEach(npo => {
        self.storage.get(npo['id'] + "_saved").then(bool => {
          if (bool) {
            self.favorites.push(npo);
          }
        })
      })
    });
  }

  goToNpo(id: string) {
    this.navCtrl.push(NpoPage, id);
  }

}
