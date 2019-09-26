import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-env-mensagem',
  templateUrl: './env-mensagem.page.html',
  styleUrls: ['./env-mensagem.page.scss'],
})
export class EnvMensagemPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams
  ) { }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
