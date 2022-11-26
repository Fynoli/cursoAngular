import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoupRoutingModule } from './checkoup-routing.module';
import { CheckoutComponent } from './checkout.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoupRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class CheckoutModule { }
