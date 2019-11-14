import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Item } from 'src/assets/extra/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.page.html',
  styleUrls: ['./informe.page.scss'],
})
export class InformePage implements OnInit {

  info: any;
  comentarios: Observable<any[]>; //Só declaração de uma lista de variáveis

  constructor(
    db: AngularFirestore,
    public modalCtrl: ModalController,
    navParams: NavParams) {
    this.info = navParams.get('item');
    let data = moment(this.info.dateAtend.toDate()).format('DD-MM-YYYY');
    console.log(this.info.atendido);
    console.log(data);
    this.comentarios = db.collection('atendidos').doc(this.info.atendido).collection('informes').doc(data).collection('comentarios').valueChanges()
    const pI = new Date(this.info.pInput * 1000);
    console.log(pI.toLocaleDateString('pt-BR'));
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
