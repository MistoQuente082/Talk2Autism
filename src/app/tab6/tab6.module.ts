import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab6Page } from './tab6.page';
import { AgendaPage } from '../agenda/agenda.page';
import { PerfilMeninosPage } from '../perfil-meninos/perfil-meninos.page';

const routes: Routes = [
  {
    path: '',
    component: Tab6Page
  }
];

@NgModule({
  entryComponents: [
    AgendaPage,
    PerfilMeninosPage
  ],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Tab6Page,
    AgendaPage,
    PerfilMeninosPage]
})
export class Tab6PageModule { }
