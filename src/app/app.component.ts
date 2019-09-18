import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  items: Observable<any[]>;
  constructor(
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
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  customDayShortNames = ['sábado', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'domingo'];
  customPickerOptions: any;
}
