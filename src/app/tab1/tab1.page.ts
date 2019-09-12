import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoticiasPage } from '../noticias/noticias.page';
import { Item } from 'src/assets/extra/item';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  noticias: any[] = [
    {
      nome: 'Novos módulos',
      mensagem: 'Estaremos disponibilizando novos módulos para encomenda',
      data: '11/09/2019',
    },
    {
      nome: 'Testando2',
      mensagem: 'Aleatorio',
      data: '11/09/2019',
    },
    {
      nome: 'Batata',
      mensagem: 'é gostoso',
      data: '11/09/2019',
    }
  ];

  constructor(
    public modalCtrl: ModalController) {
  }


  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: NoticiasPage,
      componentProps: {
        item: item
      }
    });
    return await modal.present();
  }

}
