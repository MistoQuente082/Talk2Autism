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

  info: Item;
  comentarios: Observable<any[]>; //Só declaração de uma lista de variáveis

  constructor(
    db: AngularFirestore,
    public modalCtrl: ModalController,
    navParams: NavParams) {
    this.info = navParams.get('item');
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
