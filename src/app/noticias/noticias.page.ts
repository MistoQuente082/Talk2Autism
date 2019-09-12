import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  //Item do qual são puxados os dados para a página
  info: Item;

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams) {
    this.info = navParams.get('item');
  }
  //Sair da página
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
