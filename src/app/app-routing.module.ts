import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: '',
    loadChildren: () => import('./tabs2/tabs2.module').then(m => m.Tabs2PageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs3/tabs3.module').then(m => m.Tabs3PageModule)
  },



  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
  { path: 'detalhes', loadChildren: './detalhes/detalhes.module#DetalhesPageModule' },
  { path: 'informe', loadChildren: './informe/informe.module#InformePageModule' },
  { path: 'noticias', loadChildren: './noticias/noticias.module#NoticiasPageModule' },
  { path: 'mensagem', loadChildren: './mensagem/mensagem.module#MensagemPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'env-mensagem', loadChildren: './env-mensagem/env-mensagem.module#EnvMensagemPageModule' },
  { path: 'req', loadChildren: './req/req.module#ReqPageModule' },
  { path: 'tab6', loadChildren: './tab6/tab6.module#Tab6PageModule' },
  { path: 'tab7', loadChildren: './tab7/tab7.module#Tab7PageModule' },
  { path: 'agenda', loadChildren: './agenda/agenda.module#AgendaPageModule' },  { path: 'nova-noticia', loadChildren: './nova-noticia/nova-noticia.module#NovaNoticiaPageModule' },
  { path: 'editar-noticia', loadChildren: './editar-noticia/editar-noticia.module#EditarNoticiaPageModule' },
  { path: 'editar-usuario', loadChildren: './editar-usuario/editar-usuario.module#EditarUsuarioPageModule' }

  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
