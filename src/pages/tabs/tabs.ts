import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SavedPage } from '../saved/saved';
import { ImpactPage } from '../impact/impact';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage = HomePage;
  savedPage = SavedPage;
  impactPage = ImpactPage;
  profilePage = ProfilePage;

  constructor() {

  }
}
