import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ImpactPage } from '../impact/impact';
import { SavedPage } from '../saved/saved';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  switchTabs(id: string) {
	switch(id) {
		case "explore": {
			this.navCtrl.setRoot(HomePage);
			break;
		}
		case "impact": {
			this.navCtrl.setRoot(ImpactPage);
			break;
		}
		case "saved": {
			this.navCtrl.setRoot(SavedPage);
			break;
		}
		default: {
			break;
		}
	}
  }

}
