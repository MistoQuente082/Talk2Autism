
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  public info;
  public typo;

  public info2;

  public nomeEvento;
  public horaInicio: Date = new Date();
  public horaTermino: Date = new Date();
  public dataEvento: Date = new Date();
  public detalheEvento;


  constructor(
    public db: AngularFirestore,
    public modalCtrl: ModalController,
    public banco: AngularFirestore, // Confira App.components.ts
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertController: AlertController) {
    this.info = navParams.get('item');


    this.verifiUser();
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  // Horario
  mudaIn(event) {
    this.horaInicio = new Date(event.detail.value);

  }

  mudaFin(event) {
    this.horaTermino = new Date(event.detail.value);
  }

  mudaData(event) {
    this.dataEvento = new Date(event.detail.value);


  }



  // ENNVIAR EVENTO
  subEvento() {
    if (this.nomeEvento === undefined || this.horaInicio === undefined ||
      this.dataEvento === undefined || this.horaTermino === undefined ||
      this.detalheEvento === undefined) {
      this.presentToast('Preencha os Campos');
    } else {
      this.presentAlert();
    }


  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja criar um novo evento?',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Criar',
          handler: async () => {
            const dados = {
              nomeEvento: this.nomeEvento,
              horaInicio: this.horaInicio,
              horaTermino: this.horaTermino,
              dataEvento: this.dataEvento,
              detalheEvento: this.detalheEvento
            };
            this.db.collection('eventos').add(dados).then(doc => {
              this.dismiss();
            });
          }
        }
      ]
    });
    alert.present();
  }


  // Verifica o Usuário
  verifiUser() {
    try {
      const currentUser = firebase.auth().currentUser;
      this.typo = '';
      this.banco.collection('indice').doc(currentUser.email).get().toPromise()
        .then(doc => {
          this.typo = doc.data().tipo;
          console.log('funfa: ', doc.data().tipo);
        })
        .catch(err => {
          this.typo = 'Error getting document' + err;
        });
    } finally {
      console.log('Deu super certo!');
    }
  }

  //Dados que vão para o firebase
  dados(dados) {
    this.db.collection("eventos").add(dados);
    // Coloca aqui o codigo para enviar ao firebase
    console.log(dados);
  }


  // Mostra um aviso de envio
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  ngOnInit() {
    console.log('info:', this.info);
  }

}
