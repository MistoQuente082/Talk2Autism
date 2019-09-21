import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
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
