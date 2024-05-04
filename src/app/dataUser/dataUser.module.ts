import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataUserPageRoutingModule } from './dataUser-routing.module';

import { DataUserPage } from './dataUser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataUserPageRoutingModule
  ],
  declarations: [DataUserPage]
})
export class DataUserPageModule {}
