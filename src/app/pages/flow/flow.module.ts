import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlowPageRoutingModule } from './flow-routing.module';

import { FlowPage } from './flow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlowPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FlowPage]
})
export class FlowPageModule {}
