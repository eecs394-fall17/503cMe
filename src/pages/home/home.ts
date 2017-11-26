import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NpoPage } from '../npo/npo';
import { ResultsPage } from '../results/results';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  npos: Observable<any>;
  searchInput: string;
  themes: Array<any> = ['animals','art','disaster-relief','education','energy','health','nature','science','social'];

  constructor(public navCtrl: NavController, public db: AngularFirestore) {
    this.npos = db.collection('npos').valueChanges();
    this.searchInput = '';
  }

  search(ev) {
    this.navCtrl.push(ResultsPage, this.searchInput);
  }

  test(input) {
    console.log(input);
  }
}
