import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  cpf: string;

  constructor(
    public router: Router,
    public fAuth: AngularFireAuth,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  // Botão para tabs
  async login() {
    const { email, cpf } = this;
    try {
      const res = await

        this.fAuth.auth.signInWithEmailAndPassword(email, cpf);
      console.log("Login realizado com sucesso!");
      this.presentLoading();
      this.router.navigate(['/tabs']);
    } catch (err) {
      console.dir(err);
      if (err.code === "auth/user-not-found") {
        console.log("User not found");
      }
    }
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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


  ngOnInit() {
    // console.log('hola mundo');
  }
}
