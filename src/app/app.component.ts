import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  items: Observable<any[]>;
  constructor(
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController,
    db: AngularFirestore, //Coloca em cada pg q for usar o banco de dados
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.items = db.collection('items').valueChanges(); //Preenche a lista com dados da collection do banco de dados OBS: trocar items pelo nome da coleção

    this.initializeApp();

    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    };
  }
  customDayShortNames = ['sábado', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'domingo'];
  customPickerOptions: any;

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



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
