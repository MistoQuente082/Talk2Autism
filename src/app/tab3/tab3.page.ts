import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReqPage } from '../req/req.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // Dados para os cards
  req: Observable<any[]>;

  constructor(
    db: AngularFirestore,
    public modalCtrl: ModalController
  ) {
    this.req = db.collection('requisicoes').valueChanges();
  }

  async presentModal(tipo: any) {
    const modal = await this.modalCtrl.create({
      component: ReqPage,
      componentProps: {
        tipo
      }
    });
    return await modal.present();
  }
}
