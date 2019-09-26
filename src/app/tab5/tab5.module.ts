import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab5Page } from './tab5.page';
import { MensagemPage } from '../mensagem/mensagem.page';
import { EnvMensagemPage } from '../env-mensagem/env-mensagem.page';

const routes: Routes = [
  {
    path: '',
    component: Tab5Page
  }
];

@NgModule({
  entryComponents: [MensagemPage, EnvMensagemPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab5Page,
    MensagemPage,
    EnvMensagemPage
  ]
})
export class Tab5PageModule { }
