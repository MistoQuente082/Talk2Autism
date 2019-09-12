import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
})
export class MensagemPage implements OnInit {

  info: Item;

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams) {
    this.info = navParams.get('item');
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
