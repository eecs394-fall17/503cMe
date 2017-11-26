import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NpoPage } from '../npo/npo';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  npos: Observable<any>;
  searchInput: string;

  constructor(public navCtrl: NavController, public db: AngularFirestore) {
    this.npos = db.collection('npos').valueChanges();
  }

  goToNpo(id: string) {
    this.navCtrl.push(NpoPage, id);
  }

  back() {
    this.navCtrl.pop();
  }
}
