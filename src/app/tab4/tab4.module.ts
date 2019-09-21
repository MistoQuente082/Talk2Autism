import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab4Page } from './tab4.page';
import { DetalhesPage } from '../detalhes/detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  }
];

@NgModule({
  entryComponents: [
    DetalhesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Tab4Page,
    DetalhesPage
  ],
})
export class Tab4PageModule { }
