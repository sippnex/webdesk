import {Routes} from '@angular/router';
import {AuthGuard} from "../security/auth.guard";
import {AppLoaderComponent} from "./app-loader.component";

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLoaderComponent,
    children: []
  }
];
