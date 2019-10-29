import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tabs2Page } from './tabs2.page';

const routes: Routes = [
  {
    path: 'tabs2',
    component: Tabs2Page,
    children: [
      {
        path: 'tab6',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab6/tab6.module').then(m => m.Tab6PageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab4/tab4.module').then(m => m.Tab4PageModule)
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs2/tab6',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '',
    redirectTo: '/tabs2/tab6',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tabs2PageRoutingModule { }
