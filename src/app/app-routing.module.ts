import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'autos',
    loadChildren: () => import('./autos/autos.module').then( m => m.AutosPageModule)
  },
  {
    path: 'translator',
    loadChildren: () => import('./translator/translator.module').then( m => m.TranslatoPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'price',
    loadChildren: () => import('./cash/cash.module').then(m => m.CashPageModule)
  },
  {
    path: 'registry',
    loadChildren: () => import('./registry/registry.module').then(m => m.RegistryPageModule)
  },
  {
    path: 'data',
    loadChildren: () => import('./dataUser/dataUser.module').then(m => m.DataUserPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
