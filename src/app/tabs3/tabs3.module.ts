import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tabs3PageRoutingModule } from './tabs3.router.module';

import { Tabs3Page } from './tabs3.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tabs3PageRoutingModule
  ],
  declarations: [Tabs3Page]
})
export class Tabs3PageModule { }
