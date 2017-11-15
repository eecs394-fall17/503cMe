import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ImpactPage } from '../impact/impact';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {

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
