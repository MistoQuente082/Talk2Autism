import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab6Page } from './tab6.page';
import { AgendaPage } from '../agenda/agenda.page';

const routes: Routes = [
  {
    path: '',
    component: Tab6Page
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
    Tab6Page,
    AgendaPage]
})
export class Tab6PageModule { }
