import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  public item;
  public tipoUsuario;
  public nome;
  public nomeFilho;
  public email;
  public cpf;
  public concpf;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public fAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.item = this.navParams.get('item');
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Criar',
          handler: async () => {

            const novoUsuario = {
              tipoUsuario: this.tipoUsuario,
              nome: this.nome,
              email: this.email,
              nomeFilho: this.nomeFilho
            };
            const { email, cpf } = this;

            await this.fAuth.auth.createUserWithEmailAndPassword(email, cpf);
            this.dismiss();
            this.presentToast('Usuário adicionado com sucesso!');

          }

        }
      ]
    });
    alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


  async criarConta() {
    if (this.tipoUsuario === undefined || this.nome === undefined ||
      this.email === undefined || this.cpf === undefined || this.concpf === undefined) {
      this.presentToast('Prencha os campos!');
    } else {
      if (this.cpf.toString().length === 11) {
        if (this.cpf !== this.concpf) {
          this.presentToast('O CPF é diferente na confirmação!');

        } else {
          this.presentAlert('Deseja adicionar um novo usuário?');
        }

      } else {
        this.presentToast('O CPF precisa ter 11 digitos');
      }
    }
  }


  async dismiss() {
    await this.modalCtrl.dismiss();
  }


  ngOnInit() {
  }

}
