import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AngularFirestore } from 'angularfire2/firestore';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-donated',
  templateUrl: 'donated.html',
})
export class DonatedPage {

  donated: boolean;
  userDonations: any;
  donationsRef: any;
  npoId: any;

  constructor(private viewCtrl: ViewController, params: NavParams, public db: AngularFirestore, private storage: Storage, public navCtrl: NavController) {
    this.userDonations = params.data.userDonations;
    this.donationsRef = params.data.donationsRef;
    this.npoId = params.data.npoId;
    console.log(this.npoId);
    this.donated = false;
  }

  dismiss() {
    if (this.donated) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.popToRoot();
    } else {
      this.viewCtrl.dismiss(this.donated).catch(() => { });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatedPage');
  }

  total() {
    let res = 0;
    for (let id in this.userDonations) {
      let donation = this.userDonations[id];
      res += donation.quantity * donation.donation.price;
    }
    return res;
  }

  donate() {
    let self = this;
    let total = 0;
    for (let id in this.userDonations) {
      let donation = this.userDonations[id];
      total += parseInt(donation.quantity) * donation.donation.price;
      self.donationsRef.doc(donation.donation.id).update({
        donatedAmount: parseInt(donation.donation.donatedAmount) + parseInt(donation.quantity)
      })
    }

    this.storage.get(this.npoId + '_donation').then(amount => {
      console.log(amount, total);
      if (amount) {
        self.storage.set(self.npoId + '_donation', total + amount);
      } else {
        self.storage.set(self.npoId + '_donation', total);
      }
    })

    this.donated = true;
  }

  userDonationsIterable() {
    var res = [];
    for (let id in this.userDonations) {
      res.push(this.userDonations[id]);
    }
    return res;
  }
}
