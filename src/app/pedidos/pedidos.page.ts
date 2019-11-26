import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  lista: Observable<any[]>;
  tipo: any;

  constructor(public navParams: NavParams,
    public modalCtrl: ModalController,
    public db: AngularFirestore) {
    this.tipo = navParams.get('tipo');
    console.log(this.tipo);
    this.db.collection('requisicoes').doc(this.tipo).get().toPromise().then(doc => {
      this.lista = this.db.collection("requisicoes").doc(this.tipo).collection("pedidos").valueChanges();
      console.log(this.lista);
      this.tipo = doc.data();
      console.log(this.tipo);
    });
  }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

}
