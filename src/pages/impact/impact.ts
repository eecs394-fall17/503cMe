import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SavedPage } from '../saved/saved';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-impact',
  templateUrl: 'impact.html',
})
export class ImpactPage {

  donationYear: number;
  emailed: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
