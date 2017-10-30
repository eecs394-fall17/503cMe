import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonatedPage } from './donated';

@NgModule({
  declarations: [
    DonatedPage,
  ],
  imports: [
    IonicPageModule.forChild(DonatedPage),
  ],
})
export class DonatedPageModule {}
