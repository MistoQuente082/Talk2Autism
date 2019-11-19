import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  usuario: any;
  user: any;

  tem = 1;

  requisicoes: Observable<any[]>;

  constructor(
    public db: AngularFirestore,
  ) {
    this.db.collection('requisicoes').get().toPromise().then(
      snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().status === true) {
            this.tem = 0;
          }
        })
      }
    )
  }
}
