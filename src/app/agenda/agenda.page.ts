import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, NavDelegate, NavParams } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  public currentUser: any;

  public conduct: number;
  public dateAtend: Date = new Date();
  public pInput: Date;
  public pOutput: Date;
  public comeu: boolean;
  public nTime: number;
  public comentario: string;
  public user: any;



  public info;
  constructor(
    public db: AngularFirestore,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    public navParams: NavParams) {
    this.info = navParams.get('item');
    this.currentUser = firebase.auth().currentUser
    db.collection('indice').doc(this.currentUser.email).get().toPromise().then(doc => {
      this.user = doc.data()
    });
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  mudaData(event) {
    this.dateAtend = new Date(event.detail.value);
    console.log('DIA', this.dateAtend);

  }

  mudaIn(event) {
    this.pInput = new Date(event.detail.value);
    console.log('Chegada:', this.pInput);
  }

  mudaOut(event) {
    this.pOutput = new Date(event.detail.value);
    console.log('Saida:', this.pInput);
  }

  send() {
    if (this.pInput === undefined || this.pOutput === undefined ||
      this.nTime === undefined) {
      this.presentToast('Preencha os campos!');
    }

    else {
      this.presentAlert();
    }
  }

  subInform() {
    if (this.comeu !== true) {
      this.comeu = false;
    }
    const informe = {
      atendido: this.info.id,
      conduct: this.conduct,
      dateAtend: this.dateAtend,
      pInput: this.pInput,
      pOutput: this.pOutput,
      comeu: this.comeu,
      nTime: this.nTime,
      terapeutas: 1,
      lido: false,
    };

    //get os dados em atendidos -> this.info.Nome -> informes -> data
    //Se houver um doc lá puxa os dados e soma
    //Se não, apenas cria o doc
    let data = moment(informe.dateAtend).format('DD-MM-YYYY');
    console.log(this.info.id);
    this.db.collection('atendidos').doc(this.info.id).collection('informes').doc(data).get().toPromise()
      .then(doc => {
        if (!doc.exists) {
          this.db.collection('atendidos').doc(this.info.id).collection('informes').doc(data).set(informe);
          this.db.collection('atendidos').doc(this.info.id).collection('informes').doc(data).collection('comentarios').doc(this.currentUser.email).set({
            mensagem: this.comentario,
            remetente: this.currentUser.email,
            nome: this.user.nome,
          })
          this.presentToast('Informe enviado com sucesso');
          this.dismiss();
          console.log('ainda não há dados para esse dia');
        } else {
          this.db.collection('atendidos').doc(this.info.id).collection('informes').doc(data).collection('comentarios').doc(this.currentUser.email).get().toPromise().then(coment => {
            if (!coment.exists) {
              const dadosExistentes = doc.data();
              if (this.pInput < dadosExistentes.pInput) {
                this.pInput = dadosExistentes.pInput;
              }
              if (this.pOutput > dadosExistentes.pOutput) {
                this.pOutput = dadosExistentes.pOutput;
              }
              if (this.comeu === false) {
                this.comeu = dadosExistentes.comeu;
              }
              informe.terapeutas += dadosExistentes.terapeutas;
              const informeFinal = {
                conduct: ((dadosExistentes.conduct * dadosExistentes.terapeutas) + informe.conduct) / informe.terapeutas,
                pOutput: this.pOutput,
                pInput: this.pInput,
                comeu: this.comeu,
                nTime: this.nTime + dadosExistentes.nTime,
                dateAtend: this.dateAtend,
                terapeutas: informe.terapeutas,
                lido: false,
                atendido: this.info.id
              }
              this.db.collection('atendidos').doc(this.info.id).collection('informes').doc(data).set(informeFinal);
              this.db.collection('atendidos').doc(this.info.id).collection('informes').doc(data).collection('comentarios').doc(this.currentUser.email).set({
                remetente: this.currentUser.email,
                nome: this.user.nome,
                mensagem: this.comentario,
              });
              this.presentToast('Informe enviado com sucesso');
              this.dismiss();
            } else {
              let mensagem = 'Você já enviou um informe para esse dia, não é possível enviar outro, fale com a TI para resolver esse caso';
              this.presentAlert1(mensagem);
            }
          })
          console.log('Já há dados para esse dia');
        }
      })
    console.log(data)
    console.log(informe);

  }
  // Função que chama um alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ATENÇÃO!',
      message: 'Confirma os dados?',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Enviar',
          handler: () => {
            this.subInform();
            console.log('Yeetz!');
          }
        }
      ]
    });
    await alert.present();
  }

  // Função que chama um alert
  async presentAlert1(mensagem) {
    const alert = await this.alertController.create({
      header: 'ATENÇÃO!',
      message: mensagem,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.dismiss();
            console.log('Confirm Cancel: blah');
          }
        },
      ]
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
