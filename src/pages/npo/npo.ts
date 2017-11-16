import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, IonicPage, NavParams, AlertController, Slides } from 'ionic-angular';
import { DonatedPage } from '../donated/donated';
import { Storage } from '@ionic/storage';

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
  donationsRef: any;
  unfulfilledCount: number;
  npoId: string;

  // @ViewChild(Slides) slides: Slides;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    private sanitizer: DomSanitizer,
    params: NavParams,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    let npoId = params.data;
    this.npoId = npoId;
    db.collection('npos').doc(npoId).valueChanges().subscribe((doc) => {
      this.data = doc;
    });

    this.donationsRef = db.collection('npos').doc(npoId).collection('donations');

    this.showDetails = false;
    this.donations = this.donationsRef.valueChanges();
    let self = this;
    this.unfulfilledCount = 0;
    this.donations.subscribe(ds => {
      ds.forEach(donation => {
        self.userDonations[donation.id] = {
          donation: donation,
          quantity: 0
        }
        if (donation.donatedAmount < donation.requestAmount) {
          self.unfulfilledCount++;
        }
      });
    });
    this.donationTotal = 0;
    storage.get(npoId).then(bool => {
      this.favorited = bool || false;
    });
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
      console.log(this.favorited)
      return this.emptyDonationAlert();
    }
    let self = this;
    let donated = this.modalCtrl.create(DonatedPage, {
      userDonations: self.userDonations,
      donationsRef: self.donationsRef
    });
    donated.present();
    donated.onDidDismiss(data => {
      if (data) {
        self.clearUserDonation();
      }
    });
  }

  clearUserDonation() {
    this.userDonations = {};
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
    this.clearUserDonation();
    this.navCtrl.pop();
  }

  favorite() {
    this.favorited = !this.favorited;
    this.storage.set(this.npoId, this.favorited);
  }

  // ngAfterViewInit() {
  //   this.slides.freeMode = true;
  //   this.slides.autoplayDisableOnInteraction = false;
  // }
}
