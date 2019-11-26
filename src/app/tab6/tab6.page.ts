import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AgendaPage } from '../agenda/agenda.page';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Item } from 'src/assets/extra/item';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  atendidos: Observable<any[]>;
  usuario: any;
  att: any;



  constructor(
    public modalCtrl: ModalController,
    db: AngularFirestore,
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController
  ) {
    db.collection('atendidos').get().toPromise().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data().foto);
        doc.data().foto = firebase.storage().ref(doc.data().foto).getDownloadURL();
        console.log(doc.data().foto)
      })
    });
  }



  async presentModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: AgendaPage,
      componentProps: {
        item
      }
    });
    return await modal.present();
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


  sair() {
    this.presentAlert2('Realmente quer sair?');
  }

  ngOnInit() {
  }

}
