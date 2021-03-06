import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CameraService } from '../services/camera/camera.service';

import * as firebase from 'firebase';


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
  public imgMenino;
  public idade;
  public grauAutismo;

  metadata = {
    contentType: 'image/jpeg',
  };

  Atendidos: Observable<any[]>;

  constructor(
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    public navParams: NavParams,
    public fAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public usarCamera: CameraService
  ) {
    this.Atendidos = this.db.collection("atendidos").valueChanges();
    this.item = this.navParams.get('item');

  }

  cam() {
    this.usarCamera.presentActionSheet();
    if (this.usarCamera.imgPessoa) {
      this.imgMenino = this.usarCamera.imgPessoa;
    }
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
            var novoUsuario;
            if (this.tipoUsuario === "atend") {
              var list = this.nome.split(" ");
              var id = "";
              console.log(list);
              for (var no in list) {
                id += list[no]
              }
              console.log(id);
              novoUsuario = {
                id: id,
                nome: this.nome,
                pais: [],
                idade: this.idade,
                grauAutismo: this.grauAutismo,
                foto: ' '

              };
              const imgCrianca = this.usarCamera.imgDato;
              firebase.storage().ref().child('atendidos/' + id + '.jpg').putString(imgCrianca, 'base64', this.metadata).then(doc => {
                firebase.storage().ref().child('atendidos/' + id + '.jpg').getDownloadURL().then(url => {
                  novoUsuario.foto = url;
                  this.db.collection("atendidos").doc(id).set(novoUsuario);
                  this.dismiss();
                  this.presentToast('Usuário adicionado com sucesso!');
                })
              })
            } else {
              if (this.tipoUsuario === "pai") {
                let filhos: string[];
                filhos = [];
                console.log(this.nomeFilho)
                for (var filho in this.nomeFilho) {
                  let list: string[];

                  list = this.nomeFilho[filho].split(" ");
                  var id = "";
                  for (var no in list) {
                    id += list[no]
                  }
                  console.log(id);

                  await this.db.collection('atendidos').doc(id).get().toPromise().then(doc => {
                    var lista = doc.data().pais;
                    lista.push(this.email);
                    this.db.collection('atendidos').doc(id).update({
                      pais: lista
                    });
                    console.log(id);
                    filhos.push(id);
                  })
                }

                novoUsuario = {
                  tipo: this.tipoUsuario,
                  nome: this.nome,
                  email: this.email,
                  atendido: filhos
                };


              } else {
                novoUsuario = {
                  tipo: this.tipoUsuario,
                  nome: this.nome,
                  email: this.email,
                };
              }
              const email = this.email;
              const cpf = this.cpf.toString();
              //Cria o usuário no firebaseAuth
              try {
                await this.fAuth.auth.createUserWithEmailAndPassword(email, cpf);
                this.enviar(this.email, novoUsuario);
                this.dismiss();
                this.presentToast('Usuário adicionado com sucesso!');
              } catch (err) {
                console.log(err)
                this.presentToast(err)
              }
            }
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
    if (this.tipoUsuario === "atend") {
      if (this.nome === undefined || this.grauAutismo === undefined || this.idade === undefined) {
        this.presentToast('Prencha os campos!');
      } else {
        this.presentAlert('Deseja adicionar um novo usuário?');
      }
    } else {
      if (this.tipoUsuario === undefined || this.nome === undefined ||
        this.email === undefined || this.cpf === undefined || this.concpf === undefined
      ) {
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
  }


  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  enviar(email, dados) {
    this.db.collection('indice').doc(email).set(dados);
  }


  ngOnInit() {
    this.imgMenino = "../../assets/avatar.svg";
  }

}
