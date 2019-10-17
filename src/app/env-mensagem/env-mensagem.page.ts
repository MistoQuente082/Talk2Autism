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

  public mAssunto: string;
  public mConteudo: string;
  public mDestino: any;
  public banco: any;


  constructor(
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    navParams: NavParams,
    db: AngularFirestore
  ) {
    this.banco = db;
    this.pessoas = db.collection('pais').valueChanges(); //consegue os valores da coelção noticias
  }

  // ENVIA MENSAGEM
  subMessage() {
    // VERIFICA SE OS CAMPOS FORAM DEFINIDOS
    if (this.mAssunto === undefined || this.mConteudo === undefined || this.mDestino === undefined) {
      // MOSTRA UM TOAST CASO OS CAMPOS NÃO SÃO PREENCHIDOS
      this.presentToast('Preencha os campos!');
    } else {
      const mensagem = {
        mAssunto: this.mAssunto,
        mConteudo: this.mConteudo,
        mDestino: this.mDestino,
      };

      let currentUser = firebase.auth().currentUser;

      console.log(mensagem);

      this.banco.collection("pais").doc(currentUser.email).collection("mensagens_e").add(
        mensagem).then(ref => {
          console.log(ref);
          console.log('Uniforme foi pedido com document with ID: ', ref.id);
          this.presentToast('Pedido Realizado com Sucesso!');
          this.dismiss();
        });
    }


    // MOSTRA UM TOAST CASO TUDO CERTO E FECHa O MODAL 
    this.presentToast('Mensagem enviada com sucesso!');
    this.dismiss();

  }



  // FECHAR O MODAL
  async dismiss() {
    await this.modalCtrl.dismiss();
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });

    toast.present();
  }


  ngOnInit() {
    //console.log(this.pessoas.email)
  }

}
