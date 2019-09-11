import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InformePage } from './informe.page';
import { Tab2Page } from '../tab2/tab2.page';

const routes: Routes = [
  {
    path: '',
    component: InformePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InformePage
  ]
})
export class InformePageModule { }
