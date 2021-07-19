import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user.model";
import {AuthService} from "./auth.service";
import {Jwt} from "./model/jwt.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authenticatedUser: User;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  public getAuthenticatedUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.authenticatedUser != null) {
        resolve(this.authenticatedUser);
      } else {
        const currentToken: Jwt | null = this.authService.getCurrentToken();
        if (currentToken) {
          this.httpClient.get<User>(`http://localhost:8080/api/users/${currentToken.sub}`)
            .toPromise()
            .then((user: User) => {
              this.authenticatedUser = user;
              resolve(this.authenticatedUser);
            });
        } else {
          reject(new Error('No auth token available'));
        }
      }
    });
  }

}
