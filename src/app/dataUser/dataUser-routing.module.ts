import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataUserPage } from './dataUser.page';

const routes: Routes = [
  {
    path: '',
    component: DataUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataUserPageRoutingModule {}
