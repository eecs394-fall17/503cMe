import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DonatedPage } from '../donated/donated';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: { summary: string, address: string, state: string, phone: string, details: string };
  showDetails: boolean;
  donations: Observable<any>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public db: AngularFirestore, private sanitizer: DomSanitizer) {
    this.data = {
      summary: '4k – 2nd Grade',
      address: '1669 S. 5th Street',
      state: 'Milwaukee, WI 53204',
      phone: '(414) 384-1729',
      details: 'For families, a St. Anthony School education is truly a gift of hope. It\'s the knowledge that their children will be formed not only academically, but in the faith; that each student is assisted on the path to their own unique vocation. St. Anthony is not just a school, its a family.Your donations will contribute experiences inside and outside the classroom giving students opportunities to grow as whole people through academics, music, theatre, dance, athletics, service, and after-school programming, and a variety of student organizations and clubs.'
    };
    this.showDetails = false;
    this.donations = db.collection('donations').valueChanges();
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

  Disabled(don: any) {
    //return this.disableSelector;
    return (don.donatedAmount >= don.requestAmount);
  }

  donate(id: string, orig: any, quantity: any) {
    this.db.collection('donations').doc(id).update({
      donatedAmount: parseInt(orig) + parseInt(quantity)
    });
    this.modalCtrl.create(DonatedPage).present();
  }

  donationQuantityIterable(curr: number, max: number) {
    var result = [];
    for (var i = 1; i <= max - curr; i++) {
      result.push(i);
    }
    return result;
  }

  Test(n: any) {
    console.log(n);
  }
}
