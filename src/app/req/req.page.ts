import { Component, OnInit } from '@angular/core';
import { Item } from 'src/assets/extra/item';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ObjectUnsubscribedError } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-req',
  templateUrl: './req.page.html',
  styleUrls: ['./req.page.scss'],
})
export class ReqPage implements OnInit {
  tipo: any;
  typo: any;
  banco: AngularFirestore;
  fardamento: any;
  reuniao: any;
  pai: any;

  sMod: boolean;
  sFar: boolean;
  sReu: boolean;


  modais: number;

  public aQnt: string;
  public tema: string;
  public elementos: string;
  public infoAd: string;
  public modulos: string;
  public motivo: string;
  public limHorario: string;
  public limData: string;
  public detalhes: string;
  public tamanho: string;
  public quantidade: string;
  public currentUser: any;

  public nomePai;

  constructor(

    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public db: AngularFirestore,
    public alertController: AlertController,
    public navParams: NavParams) {
    this.currentUser = firebase.auth().currentUser;
    this.db.collection('indice').doc(this.currentUser.email).get().toPromise().then(doc =>{
        this.nomePai = doc.data().nome
    })
    this.banco = db;
    this.tipo = navParams.get('tipo');
    this.typo = navParams.get('typo');

    db.collection('requisicoes').doc('modulos').get().toPromise().then(doc => {
      this.sMod = doc.data().status;
    });

    db.collection('requisicoes').doc('fardamentos').get().toPromise().then(doc => {
      this.sFar = doc.data().status;
    });

    db.collection('requisicoes').doc('reunioes').get().toPromise().then(doc => {
      this.sReu = doc.data().status;
    });
  }
  // Sair da página
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  // Mostra um aviso de envio
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }




  // MOSTRA UMA ALERTA NA TELA
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Algo deu errado',
      message,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    alert.present();
  }

  // MOSTRA UMA ALERTA NA TELA
  async alert() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja realizar as modificações?',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: async () => {
            console.log('Enviou!');
            this.db.collection('requisicoes').doc('fardamentos').update({
              status: this.sFar,
            }); console.log(this.sFar);

            this.db.collection('requisicoes').doc('modulos').update({
              status: this.sMod,
            }); console.log(this.sMod);

            this.db.collection('requisicoes').doc('reunioes').update({
              status: this.sReu,
            }); console.log(this.sReu);
          }
        }
      ]
    });
    alert.present();
    this.dismiss();
  }
  subStatus() {
    this.alert();
  }

  // VERIFICA O TIPO DE REQUISIÇÃO E ABRE O MODAL CORRESPONDENTE
  ngOnInit() {
    console.log(this.typo);
    this.db.collection('requisicoes').doc('modulos').get().toPromise().then(doc => {
      this.sMod = doc.data().status;
      console.log(this.sMod);
    });

    this.db.collection('requisicoes').doc('modulos').get().toPromise().then(doc => {
      this.sFar = doc.data().status;
      console.log(this.sFar);
    });

    this.db.collection('requisicoes').doc('modulos').get().toPromise().then(doc => {
      this.sReu = doc.data().status;
      console.log(this.sReu);
    });
    if (this.tipo.nome === 'Fardamentos') {
      this.modais = 1;
      // console.log('isso láaaaaa', this.typo);
    }

    if (this.tipo.nome === 'Módulos') {
      this.modais = 2;
      // console.log('isso láaaaaa', this.typo);
    }

    if (this.tipo.nome === 'Reuniões') {
      this.modais = 3;
      console.log(this.tipo);
      // console.log('isso láaaaaa', this.typo);
    }

    if (this.tipo.status === false && this.tipo.nome === 'Reuniões') {
      this.modais = 0;
    }
  }
  // Enviar pedido de reunião
  subMeeting() {
    if (this.motivo !== undefined && this.limHorario !== undefined
      && this.limData !== undefined && this.detalhes !== undefined) {
        
      const reun = {
        motivo: this.motivo,
        limHorario: this.limHorario,
        limData: this.limData,
        detalhes: this.detalhes,
        pai: this.nomePai,
        paiEmail: this.currentUser.email
      };
      console.log(reun);
      this.banco.collection("requisicoes").doc(this.tipo.id).collection("pedidos").add(
        reun).then(ref => {
          console.log(ref);
          console.log('Reunião foi pedida com ID: ', ref.id);
          this.presentToast('Pedido Realizado com Sucesso!');
          this.dismiss();
        });
    } else {
      this.presentAlert('Preencha os campos!');
    }
  }

  // Enviar pedido de Modulos
  subModules() {
    if (this.aQnt !== undefined && this.tema !== undefined
      && this.elementos !== undefined && this.infoAd !== undefined && this.modulos !== undefined) {
      const mod = {
        aQnt: this.aQnt,
        tema: this.tema,
        elementos: this.elementos,
        infoAd: this.infoAd,
        modulos: this.modulos,
        pai: this.nomePai,
        paiEmail: this.currentUser.email
      };

      console.log(mod);
      this.banco.collection('requisicoes').doc(this.tipo.id).collection("pedidos").add(
        mod).then(ref => {
          console.log(ref);
          console.log('Modulos foi pedido com document with ID: ', ref.id);
          this.presentToast('Pedido Realizado com Sucesso!');
          this.dismiss();
        });
    } else {
      this.presentAlert('Preencha os campos!');
    }
  }
  // Enviar pedido de fardamento
  async subUniform() {
    if (this.tamanho !== undefined && this.quantidade !== undefined) {
      const fard = {
        tamanho: this.tamanho,
        quantidade: this.quantidade,
        pai: this.nomePai,
        paiEmail: this.currentUser.email
      };

      console.log(fard);
      this.banco.collection("requisicoes").doc(this.tipo.id).collection("pedidos").add(
        fard).then(ref => {
          console.log(ref);
          console.log('Uniforme foi pedido com document with ID: ', ref.id);
          this.presentToast('Pedido Realizado com Sucesso!');
          this.dismiss();
        });
    } else {
      // MOSTRA UMA ALERTA CASO NÃO PREENCHEU OS CAMPOS
      this.presentAlert('Preencha os campos!');
    }
  }
}