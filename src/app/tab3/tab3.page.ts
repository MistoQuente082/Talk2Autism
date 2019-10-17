import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
    public modalCtrl: ModalController,
    public alertController: AlertController
  ) {
    this.req = db.collection('requisicoes').valueChanges();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Algo deu errado',
      message,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    alert.present();
  }

  async presentModal(tipo: any) {
    if (tipo.status === false) {
      this.presentAlert('Pedidos de ' + tipo.nome + ' não estão disponíveis no momento');
      console.log('Sem Reunião');
    }
    else {
      const modal = await this.modalCtrl.create({
        component: ReqPage,
        componentProps: {
          tipo
        }
      });
      return await modal.present();
    }
  }
}
