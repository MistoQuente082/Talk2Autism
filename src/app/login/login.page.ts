import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;
  loading: HTMLIonLoadingElement;

  tipo: boolean;

  constructor(
    public router: Router,
    public fAuth: AngularFireAuth,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastCtrl: ToastController
  ) { }

  hideShow() {
    this.tipo = !this.tipo;
  }

  // Botão para tabs
  async login() {
    const { email, senha } = this;
    // Loading em espera
    await this.presentLoading();
    // Se tudo certo, entra
    try {
      await this.fAuth.auth.signInWithEmailAndPassword(email, senha);
      this.router.navigate(['/tabs']);

      // Senha ou email errado
    } catch (err) {

      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        console.log('User not found');
        this.loading.dismiss();
        this.presentToast('Email ou senha invalido!');
      }
      // Finaliza loading
    } finally {
      this.loading.dismiss();
      
    }
  }





  async presentLoading() {
    this.loading = await this.loadingController.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  // Aviso para o login
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


  ngOnInit() {
    // console.log('hola mundo');
  }
}
