import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-env-mensagem',
  templateUrl: './env-mensagem.page.html',
  styleUrls: ['./env-mensagem.page.scss'],
})
export class EnvMensagemPage implements OnInit {

  pessoas: Observable<any[]>;

  public asMens: string;
  public contMens: string;


  constructor(
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    navParams: NavParams,
    db: AngularFirestore

  ) {
    let currentUser = firebase.auth().currentUser; //Consegue o ID do usuário logado
    this.pessoas = db.collection('pais').valueChanges(); //consegue os valores da coelção noticias
  }

  subMessage() {
    const k = {
      asMens: this.asMens,
      contMens: this.contMens,
    };

    console.log(k);
    console.log(this.asMens);
    console.log(this.contMens);
    if (this.asMens === undefined || this.contMens === undefined || this.pessoas === undefined) {
      this.presentToast('Preencha os campos!');
    } else {
      this.presentToast('Mensagem enviada com sucesso!');
      this.dismiss();

    }

  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  ngOnInit() {
  }

}
