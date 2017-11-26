import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, IonicPage } from 'ionic-angular';

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

  constructor(private viewCtrl: ViewController, params: NavParams, public db: AngularFirestore, public navCtrl: NavController) {
    this.userDonations = params.data.userDonations;
    this.donationsRef = params.data.donationsRef;
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
    for (let id in this.userDonations) {
      let donation = this.userDonations[id];
      self.donationsRef.doc(donation.donation.id).update({
        donatedAmount: parseInt(donation.donation.donatedAmount) + parseInt(donation.quantity)
      })
    }

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
