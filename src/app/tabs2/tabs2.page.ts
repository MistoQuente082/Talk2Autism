import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs2.page.html',
  styleUrls: ['tabs2.page.scss']
})
export class Tabs2Page {
  usuario: any;
  user: any;

  constructor(
    public db: AngularFirestore,
  ) {
  }
}
