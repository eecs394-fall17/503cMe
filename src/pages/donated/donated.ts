import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';

/**
 * Generated class for the DonatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donated',
  templateUrl: 'donated.html',
})
export class DonatedPage {

  constructor(private viewCtrl: ViewController) {
  }

  dismiss(data?) {
	this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatedPage');
  }

}
