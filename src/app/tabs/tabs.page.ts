import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  usuario: any;
  user: any;

  k = 0;

  constructor(
    public db: AngularFirestore,
  ) {
  }
}
