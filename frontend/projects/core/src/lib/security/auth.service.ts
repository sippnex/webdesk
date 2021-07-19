import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtResponse} from "./model/jwt-response.model";
import {Jwt} from "./model/jwt.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject: Subject<Jwt | null> = new BehaviorSubject<Jwt | null>(null);

  constructor(private httpClient: HttpClient) {
    const currentToken = this.getCurrentToken();
    if (currentToken) {
      this.tokenSubject.next(currentToken);
    }
  }

  public isAuthenticated(): boolean {
    return this.getCurrentToken() != null;
  }

  public login(username: string, password: string): Promise<boolean> {
    return this.httpClient.post<JwtResponse>('http://localhost:8080/login', {
      username: username,
      password: password
    }).toPromise().then((jwtResponse: JwtResponse) => {
      sessionStorage.setItem('token', jwtResponse.token);
      this.tokenSubject.next(new Jwt(jwtResponse.token));
      return true;
    }).catch(() => {
      return false;
    });
  }

  public logout() {
    sessionStorage.removeItem('token');
  }

  public getToken(): Observable<Jwt | null> {
    return this.tokenSubject.asObservable();
  }

  public getCurrentToken(): Jwt | null {
    let base64Jwt: string | null = sessionStorage.getItem('token');
    if (base64Jwt) {
      let jwt: Jwt = new Jwt(base64Jwt);
      if (new Date() < jwt.exp) {
        return jwt;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

}
