import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ReqPage } from '../req/req.page';
import { PedidosPage } from '../pedidos/pedidos.page';

@NgModule({

  entryComponents: [
    PedidosPage,
    ReqPage
  ],


  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [
    PedidosPage,
    Tab3Page,
    ReqPage
  ]
})
export class Tab3PageModule { }
