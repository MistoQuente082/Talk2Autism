import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgendaPage } from '../agenda/agenda.page';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

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



  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AgendaPage
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
