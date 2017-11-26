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
  results: Observable<any>;

  constructor(public navCtrl: NavController, public db: AngularFirestore, public params: NavParams) {
    this.npos = db.collection('npos').valueChanges();
    if (params.data == "") {
      this.results = this.npos;
    } else {
      this.results = this.npos.map(npos => {
        return npos.filter(npo => {
          console.log(npo.name.indexOf(params.data) !== -1);
          return npo.name.indexOf(params.data) !== -1;
        });
      });
    }
  }

  goToNpo(id: string) {
    this.navCtrl.push(NpoPage, id);
  }

  back() {
    this.navCtrl.pop();
  }
}
