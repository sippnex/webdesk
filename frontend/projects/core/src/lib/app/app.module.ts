import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AppLoaderComponent} from "./app-loader.component";

@NgModule({
  declarations: [
    AppLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class AppModule {
}
