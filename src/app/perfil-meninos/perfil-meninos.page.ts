import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { EditarUsuarioPage } from '../editar-usuario/editar-usuario.page';
import { AgendaPage } from '../agenda/agenda.page';

@Component({
  selector: 'app-perfil-meninos',
  templateUrl: './perfil-meninos.page.html',
  styleUrls: ['./perfil-meninos.page.scss'],
})
export class PerfilMeninosPage implements OnInit {
  public nome = 'Rafa';
  public responsaveis = 'joao';

  public item;
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public navCtrl: NavController) {
    this.item = navParams.get('item');
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AgendaPage,
      componentProps: {
        item: this.item
      }
    });
    return await modal.present();

  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
