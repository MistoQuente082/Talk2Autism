import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReqPage } from '../req/req.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // Dados para os cards
  req: any[] = [
    {
      // O comentario abaixo, permite linha mais longa.
      // tslint:disable-next-line: max-line-length
      img: '../assets/uniforme.png',
      tipo: 'Fardamentos',
    },

    {
      // O comentario abaixo, permite linha mais longa.
      // tslint:disable-next-line: max-line-length
      img: '../assets/modulos.png',
      tipo: 'Módulos',
    },

    {
      // O comentario abaixo, permite linha mais longa.
      // tslint:disable-next-line: max-line-length
      img: '../assets/reunioes.jpg',
      tipo: 'Reuniões',
    },
  ];
  constructor(
    public modalCtrl: ModalController
  ) { }

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
