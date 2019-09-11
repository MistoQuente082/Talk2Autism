import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }

}
