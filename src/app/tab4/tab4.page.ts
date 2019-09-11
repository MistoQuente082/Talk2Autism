import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalhesPage } from '../detalhes/detalhes.page';



@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  async teste() {
    const modal = await this.modalCtrl.create({
      component: DetalhesPage
    });
    modal.present();
  }

  ngOnInit() {
  }

}
