import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SavedPage } from '../saved/saved';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-impact',
  templateUrl: 'impact.html',
})
export class ImpactPage {

  donationYear: number;
  emailed: boolean;
  total: number;

  npos: Observable<any>;
  results: any = [];
  donations: any = [];

  constructor(public navCtrl: NavController, public db: AngularFirestore, private storage: Storage, public navParams: NavParams) {
    this.npos = db.collection('npos').valueChanges();
  }

  ionViewWillEnter() {
    this.getDonations();
  }


  selectImage() {
    if (this.donationYear && this.emailed) {
      return "../../assets/imgs/check-your-email-icon.png"
    } else if (this.donationYear) {
      return "../../assets/imgs/email_icon.png"
    } else {
      return "../../assets/imgs/Adobe_icon.png"
    }
  }

  sendEmail() {
    if (this.donationYear) {
      this.emailed = true;
    }
  }

  getDonations() {
    let self = this;
    console.log("getting donations");
    this.npos.forEach(npos => {
      this.donations = [];
      this.results = [];
      this.total = 0;
      npos.forEach(npo => {
        self.storage.get(npo['id'] + '_donation').then(amount => {
          if (amount) {
            self.results.push(npo);
            self.donations.push(amount);
            self.total += amount;
          }
        })
      })
    })
  }

}
