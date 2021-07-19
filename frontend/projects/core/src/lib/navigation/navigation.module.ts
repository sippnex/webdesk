import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "./navigation.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    NavigationComponent,
  ]
})
export class NavigationModule { }
