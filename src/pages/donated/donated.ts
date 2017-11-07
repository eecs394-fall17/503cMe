import { Component } from '@angular/core';
import { ViewController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the DonatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donated',
  templateUrl: 'donated.html',
})
export class DonatedPage {

  donated: boolean;
  userDonations: any;

  constructor(private viewCtrl: ViewController, params: NavParams) {
    this.userDonations = params.data.userDonations;
    this.donated = false;
  }

  dismiss() {
    this.viewCtrl.dismiss(this.donated).catch(() => {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatedPage');
  }

  total(userDonations: any) {
    let res = 0;
    userDonations.forEach(donation => {
      res += donation.quantity * donation.price;
    });
    return res;
  }

  donate() {
    this.donated = true;
  }
}
