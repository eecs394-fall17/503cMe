import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DonatedPage } from '../donated/donated';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	data: Array<{ summary: string, address: string, state: string, phone: string, details: string, showDetails: boolean}> = [];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
		this.data.push({
			summary: '4k – 2nd Grade',
			address: '1669 S. 5th Street',
			state: 'Milwaukee, WI 53204',
			phone: 'Phone: (414) 384-1729',
			details: 'For families, a St. Anthony School education is truly a gift of hope. It\'s the knowledge that their children will be formed not only academically, but in the faith; that each student is assisted on the path to their own unique vocation. St. Anthony is not just a school, its a family.Your donations will contribute experiences inside and outside the classroom giving students opportunities to grow as whole people through academics, music, theatre, dance, athletics, service, and after-school programming, and a variety of student organizations and clubs.',
			showDetails: false
		});
	}
	
	toggleDetails(data) {
		if (data.showDetails) {
			data.showDetails = false;
		}
		else {
			data.showDetails = true;
		}
	}
  
	Donate() {
		this.modalCtrl.create(DonatedPage).present();
	}
}
