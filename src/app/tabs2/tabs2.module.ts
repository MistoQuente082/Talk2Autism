import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tabs2PageRoutingModule } from './tabs2.router.module';

import { Tabs2Page } from './tabs2.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tabs2PageRoutingModule
  ],
  declarations: [Tabs2Page]
})
export class Tabs2PageModule { }
