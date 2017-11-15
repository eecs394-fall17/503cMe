import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DonatedPage } from '../donated/donated';
import { NpoPage } from '../npo/npo';
import { SavedPage } from '../saved/saved';
import { ImpactPage } from '../impact/impact';
import { ProfilePage } from '../profile/profile';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  npos: Observable<any>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public db: AngularFirestore, private sanitizer: DomSanitizer) {
    this.npos = db.collection('npos').valueChanges();
  }

  goToNpo(id: string) {
    this.navCtrl.push(NpoPage, id);
  }
  
  switchTabs(id: string) {
	switch(id) {
		case "saved": {
			this.navCtrl.setRoot(SavedPage);
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
