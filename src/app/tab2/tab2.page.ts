import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ModalController } from '@ionic/angular';
import { InformePage } from '../informe/informe.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  myDate: string;
  customPickerOptions: any;

  avisos: any[] = [
    {
      "data": "11/09/2019",
      "banheiro": "3",
      "alimentacao": "Comeu",
      "agua": "2 copos"
    },
    {
      "data": "11/09/2019",
      "banheiro": "3",
      "alimentacao": "Comeu",
      "agua": "2 copos"
    },
    {
      "data": "11/09/2019",
      "banheiro": "3",
      "alimentacao": "Comeu",
      "agua": "2 copos"
    }
  ];

  constructor(private datePicker: DatePicker,
    public modalCtrl: ModalController) {
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

  async presentModal(data: any) {
    console.log("Entrou");
    const modal = await this.modalCtrl.create({
      component: InformePage,
      componentProps: {
        'Data': data
      }
    });
    return await modal.present();
  }

  showDatepicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText: "Save Date",
      todayText: "Set Today"
    }).then(
      date => {
        this.myDate = date.getDate() + "/" + date.toLocaleString('default', { month: 'long' }) + "/" + date.getFullYear();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}

