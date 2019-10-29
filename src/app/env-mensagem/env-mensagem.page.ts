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
    this.pessoas = db.collection('indice').valueChanges(); //consegue os valores da coelção noticias
  }

  // ENVIA MENSAGEM
  subMessage() {
    let currentUser = firebase.auth().currentUser;
    // VERIFICA SE OS CAMPOS FORAM DEFINIDOS
    if (this.mAssunto === undefined || this.mConteudo === undefined || this.mDestino === undefined) {
      // MOSTRA UM TOAST CASO OS CAMPOS NÃO SÃO PREENCHIDOS
      this.presentToast('Preencha os campos!');
    } else {
      const mensagem = {
        mAssunto: this.mAssunto,
        mConteudo: this.mConteudo,
        mDestino: this.mDestino,
        mRemetente: currentUser.email,
      };
      console.log(this.mDestino)


      for (var i = 0; i < mensagem.mDestino.length; i++) {
        var dest = mensagem.mDestino[i].split(": ")[1]
        console.log(i, dest); // i é o índice, matriz[i] é o valor
        this.banco.collection('indice').doc(dest).collection("mensagens_r").add(
          mensagem).then(ref => {
            console.log(ref);
            console.log('Uniforme foi pedido com document with ID: ', ref.id);
            // MOSTRA UM TOAST CASO TUDO CERTO E FECHa O MODAL 
            this.presentToast('Mensagem enviada com sucesso!');
            this.dismiss();
          });
      }

      console.log(mensagem);

      this.banco.collection('indice').doc(currentUser.email).collection("mensagens_e").add(
        mensagem).then(ref => {
          console.log(ref);
          console.log('Uniforme foi pedido com document with ID: ', ref.id);
          // MOSTRA UM TOAST CASO TUDO CERTO E FECHa O MODAL 
          this.presentToast('Mensagem enviada com sucesso!');
          this.dismiss();
        });
    }



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
