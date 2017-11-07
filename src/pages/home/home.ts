import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DonatedPage } from '../donated/donated';
import { NpoPage } from '../npo/npo';

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
}
