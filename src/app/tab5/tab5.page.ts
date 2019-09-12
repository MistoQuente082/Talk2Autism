import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';
import { NoticiasPage } from '../noticias/noticias.page';
import { MensagemPage } from '../mensagem/mensagem.page';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  ///lista de itens
  mensagens: any[] = [
    {
      nome: 'Jhonny Depp',
      perfil: 'https://biografieonline.it/img/bio/gallery/p/Paulo_Dybala_5.jpg',
      assunto: "Random",
      mensagem: 'Yopyop',
      data: '11/09/2019',
    },
    {
      nome: 'Jhonny Depp',
      perfil: 'https://biografieonline.it/img/bio/gallery/p/Paulo_Dybala_5.jpg',
      assunto: "Random",
      mensagem: 'Yopyop',
      data: '11/09/2019',
    },
    {
      nome: 'Jhonny Depp',
      perfil: 'https://biografieonline.it/img/bio/gallery/p/Paulo_Dybala_5.jpg',
      assunto: "Random",
      mensagem: 'Yopyop',
      data: '11/09/2019',
    }
  ];

  constructor(
    public modalCtrl: ModalController) {
  }
  ngOnInit() {
  }

  //Função que chama a pagina na forma de um modal, enviando dados a ela
  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: MensagemPage,
      componentProps: {
        item: item
      }
    });
    return await modal.present();
  }

}
