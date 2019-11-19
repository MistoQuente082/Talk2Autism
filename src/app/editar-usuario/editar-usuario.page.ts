import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



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

  Atendidos: Observable<any[]>;

  constructor(
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    public navParams: NavParams,
    public fAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.Atendidos = this.db.collection("atendidos").valueChanges();
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
                pais: []
              }
              this.db.collection("atendidos").doc(id).set(novoUsuario);
              this.dismiss();
              this.presentToast('Usuário adicionado com sucesso!');
            } else {
              if (this.tipoUsuario === "pai") {
                let filhos: string[];
                filhos = [];
                for (var filho in this.nomeFilho) {
                  let list: string[];
                  list = this.nomeFilho[filho].split(" ");
                  var id = "";
                  console.log(list);
                  for (var no in list) {
                    id += list[no]
                  }
                  console.log(id);
                  filhos.push(id);
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
                }
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
      if (this.nome === undefined) {
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
  }

}
