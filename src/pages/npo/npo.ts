import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, NavParams } from 'ionic-angular';
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
  userDonations: any = [];
  favorited: boolean;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    private sanitizer: DomSanitizer,
    params: NavParams
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
        self.userDonations.push({
          name: donation.name,
          price: donation.price,
          quantity: 0
        })
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

  Disabled(donationQuantity: number) {
    return !(donationQuantity != null && !isNaN(donationQuantity) && donationQuantity > 0);
  }

  donate(id: string, orig: any, quantity: any) {
    // this.db.collection('donations').doc(id).update({
    //   donatedAmount: parseInt(orig) + parseInt(quantity)
    // });
    let self = this;
    let donated = this.modalCtrl.create(DonatedPage, {
      userDonations: self.userDonations
    });
    donated.present();
    donated.onDidDismiss(data => {
      console.log(data);
      if (data) {
        self.userDonations.forEach(donation => {
          donation.quantity = 0;
        })
      }
    });
  }

  donationQuantityIterable(curr: number, max: number) {
    var result = [];
    for (var i = 0; i <= max - curr; i++) {
      result.push(i);
    }
    return result;
  }

  addDonation(donation: any) {
    this.donationTotal = 0;
    this.userDonations.forEach(d => {
      if (d.name == donation.name) {
        d.quantity = donation.quantity;
      }
      this.donationTotal += d.quantity * d.price;
    });
  }

  back() {
    this.navCtrl.pop();
  }

  favorite() {
    this.favorited = !this.favorited;
  }
}
