import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoticiasPage } from '../noticias/noticias.page';
import { Item } from 'src/assets/extra/item';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // lista de itens  --- Remover
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

  items: Observable<any[]>; //Só declaração de uma lista de variáveis

  constructor(
    db: AngularFirestore, //Confira App.components.ts
    public modalCtrl: ModalController) {
    this.items = db.collection('Aviso').valueChanges(); //descrição mais detalhada desta função no app.components.ts
  }

  // Função que chama a pagina na forma de um modal, enviando dados a ela
  async presentModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: NoticiasPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }

}
