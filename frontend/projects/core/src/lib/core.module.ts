import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CoreComponent} from './core.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {SecurityModule} from './security/security.module';
import {RouterModule} from "@angular/router";
import {coreRoutes} from './core.route';
import {JsonDateInterceptor} from './shared/json-date.interceptor';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AppModule} from "./app/app.module";
import {WidgetModule} from "./widget/widget.module";
import {NavigationModule} from "./navigation/navigation.module";

@NgModule({
  declarations: [
    CoreComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SecurityModule,
    NavigationModule,
    DashboardModule,
    AppModule,
    WidgetModule,
    RouterModule.forRoot(coreRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonDateInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
}
