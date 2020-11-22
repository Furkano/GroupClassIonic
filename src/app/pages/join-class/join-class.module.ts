import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { JoinClassPageRoutingModule } from './join-class-routing.module';

import { JoinClassPage } from './join-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinClassPageRoutingModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  declarations: [JoinClassPage]
})
export class JoinClassPageModule {}
