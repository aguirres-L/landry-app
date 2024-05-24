import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'autos',
    loadChildren: () => import('./autos/autos.module').then(m => m.AutosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'translator',
    loadChildren: () => import('./translator/translator.module').then(m => m.TranslatoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'price',
    loadChildren: () => import('./cash/cash.module').then(m => m.CashPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registry',
    loadChildren: () => import('./registry/registry.module').then(m => m.RegistryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'data',
    loadChildren: () => import('./dataUser/dataUser.module').then(m => m.DataUserPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
