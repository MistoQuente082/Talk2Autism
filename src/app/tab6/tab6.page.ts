import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgendaPage } from '../agenda/agenda.page';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  constructor(
    public modalCtrl: ModalController) {

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
