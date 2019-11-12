import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.page.html',
  styleUrls: ['./editar-noticia.page.scss'],
})
export class EditarNoticiaPage implements OnInit {
  public noticia;
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    this.noticia = navParams.get('item');
  }




  // Sair da página
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
