import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DonatedPage } from '../donated/donated';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }
  
  Donate() {
	  this.modalCtrl.create(DonatedPage).present();
  }

}
