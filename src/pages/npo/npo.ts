import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, NavParams, AlertController } from 'ionic-angular';
import { DonatedPage } from '../donated/donated';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-npo',
  templateUrl: 'npo.html',
})

export class NpoPage {

  data: any;
  showDetails: boolean;
  donations: Observable<any>;
  donationTotal: number;
  userDonations: any = {};
  favorited: boolean;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    private sanitizer: DomSanitizer,
    params: NavParams,
    private alertCtrl: AlertController
  ) {
    let npoId = params.data;
    db.collection('npos').doc(npoId).valueChanges().subscribe((doc) => {
      this.data = doc;
    });

    this.showDetails = false;
    this.donations = db.collection('donations').valueChanges();
    let self = this;
    this.donations.subscribe(ds => {
      ds.forEach(donation => {
        self.userDonations[donation.id] = {
          donation: donation,
          quantity: 0
        }
      });
    });
    this.donationTotal = 0;
    this.favorited = false;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  isGrey(don: any) {
    var style = '';
    if (don.donatedAmount >= don.requestAmount) {
      style = 'opacity: 0.2;';
      return this.sanitizer.bypassSecurityTrustStyle(style);
    }
    else {
      return style;
    }
  }

  emptyDonationAlert() {
    let alert = this.alertCtrl.create({
      title: 'No items selected',
      subTitle: "Please select donation items first",
      buttons: ['Dismiss']
    });
    alert.present();
  }

  donate(id: string, orig: any, quantity: any) {
    if (this.donationTotal == 0) {
      return this.emptyDonationAlert();
    }
    let self = this;
    let donated = this.modalCtrl.create(DonatedPage, {
      userDonations: self.userDonations
    });
    donated.present();
    donated.onDidDismiss(data => {
      if (data) {
        for (let id in self.userDonations) {
          self.userDonations[id].quantity = 0;
        }
      }
    });
    this.donationTotal = 0;
  }

  donationQuantityIterable(curr: number, max: number) {
    var result = [];
    for (var i = 0; i <= max - curr; i++) {
      result.push(i);
    }
    return result;
  }

  addDonation(donation: any) {
    let self = this;
    var res = 0;
    this.userDonations[donation.id].quantity = donation.quantity;

    for (let id in this.userDonations) {
      let d = this.userDonations[id];
      res += d.quantity * d.donation.price;
    }
    this.donationTotal = res;
  }

  back() {
    this.navCtrl.pop();
  }

  favorite() {
    this.favorited = !this.favorited;
  }
}
