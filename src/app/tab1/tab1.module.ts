import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { NoticiasPage } from '../noticias/noticias.page';
import { NovaNoticiaPage } from '../nova-noticia/nova-noticia.page';


@NgModule({
  entryComponents: [
    NoticiasPage,
    NovaNoticiaPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [
    Tab1Page,
    NovaNoticiaPage,
    NoticiasPage]
})
export class Tab1PageModule { }
