import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  public dateAtend: Date = new Date();
  constructor(
    public modalCtrl: ModalController) {

  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  mudaData(event) {
    console.log('Data: ', new Date(event.detail.value));
  }

  ngOnInit() {
  }

}
