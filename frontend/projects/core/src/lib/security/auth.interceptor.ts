import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Jwt} from "./model/jwt.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with bearer auth credentials if available
    let jwt: Jwt | null = this.authService.getCurrentToken();
    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt.base64}`
        }
      });
    } else {
      this.authService.logout();
    }
    return next.handle(request);
  }
}
