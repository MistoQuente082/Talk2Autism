import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


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
    public fAuth: AngularFireAuth
  ) { }

  // Botão para tabs
  async login() {
    const { email, cpf } = this;
    try {
      const res = await

        this.fAuth.auth.signInWithEmailAndPassword(email, cpf);
      console.log("Login realizado com sucesso!")
      this.router.navigate(['/tabs']);
    } catch (err) {
      console.dir(err);
      if (err.code === "auth/user-not-found") {
        console.log("User not found");
      }
    }
  }


  ngOnInit() {
    // console.log('hola mundo');
  }
}
