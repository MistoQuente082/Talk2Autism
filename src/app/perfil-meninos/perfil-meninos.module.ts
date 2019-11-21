import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilMeninosPage } from './perfil-meninos.page';

import { AgendaPage } from '../agenda/agenda.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilMeninosPage
  }
];

@NgModule({
  entryComponents: [
    AgendaPage
  ],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AgendaPage
  ]
})
export class PerfilMeninosPageModule { }
