import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalhesPage } from '../detalhes/detalhes.page';
import { Item } from 'src/assets/extra/item';



@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  eventos: any[] = [
    {
      data: '11/09/2019',
      nome: 'Recesso',
      mensagem: 'Ihuu'
    },
    {
      data: '11/09/2019',
      nome: 'Recesso',
      mensagem: 'Ihuu'
    },
    {
      data: '11/09/2019',
      nome: 'Recesso',
      mensagem: 'Ihuu'
    }
  ];

  constructor(
    public modalCtrl: ModalController
  ) { }

  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: DetalhesPage,
      componentProps: {
        item: item
      }
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
