import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController, ActionSheetController } from '@ionic/angular';
import { EditarUsuarioPage } from '../editar-usuario/editar-usuario.page';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  pais: Observable<any[]>;
  terapeutas: Observable<any[]>;
  admins: Observable<any[]>;
  atendidos: Observable<any[]>;


  constructor(
    public db: AngularFirestore,
    public fAuth: AngularFireAuth,
    public router: Router,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public modalCtrl: ModalController
  ) {
    this.atendidos = db.collection('atendidos').valueChanges();
    this.pais = db.collection('indice', ref =>
      ref.where('tipo', '==', 'pai')).valueChanges();
    this.terapeutas = db.collection('indice', ref =>
      ref.where('tipo', '==', 'terapeuta')).valueChanges();
    this.admins = db.collection('indice', ref =>
      ref.where('tipo', '==', 'adm')).valueChanges();
  }
  //Função que chama um alert
  async presentAlert2(mensagem) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: mensagem,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sair',
          handler: async () => {
            console.log('Saiu!');
            await this.fAuth.auth.signOut();
            this.router.navigate(['/']);


          }
        }
      ]
    });
    await alert.present();
  }

  async presentModal(item) {
    const modal = await this.modalCtrl.create({
      component: EditarUsuarioPage,
      componentProps: {
        item
      }
    });

    await modal.present();

  }

  async excluir(user) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Realmente deseja excluir?',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Excluir',
          handler: async () => {
            // Coloca aqui para excluir
            this.db.collection("indice").doc(user).delete();
            this.presentToast('Excluido com sucesso');
          }
        }
      ]
    });
    await alert.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  sair() {
    this.presentAlert2('Realmente quer sair?');
  }

  async presentActionSheet(usuario) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Excluir usuário',
        icon: 'trash',
        cssClass: 'vermelho',
        handler: () => {
          this.excluir(usuario);
          console.log('Tirar foto clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  ngOnInit() {
  }

}
