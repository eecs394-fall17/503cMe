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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  switchTabs(id: string) {
	switch(id) {
		case "explore": {
			this.navCtrl.setRoot(HomePage);
			break;
		}
		case "saved": {
			this.navCtrl.setRoot(SavedPage);
			break;
		}
		case "profile": {
			this.navCtrl.setRoot(ProfilePage);
			break;
		}
		default: {
			break;
		}
	}
  }

}
