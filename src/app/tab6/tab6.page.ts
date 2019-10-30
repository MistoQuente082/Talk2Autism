import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgendaPage } from '../agenda/agenda.page';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Item } from 'src/assets/extra/item';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  atendidos: Observable<any[]>;
  usuario: any;
  att: any;

  constructor(
    public modalCtrl: ModalController,
    db: AngularFirestore
  ) {
    const currentUser = firebase.auth().currentUser;
    this.atendidos = db.collection('atendidos').valueChanges();
  }



  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: AgendaPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
