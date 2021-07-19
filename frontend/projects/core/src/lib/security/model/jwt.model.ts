export class Jwt {

  public base64: string;
  public sub: string;
  public iat: Date;
  public exp: Date;

  constructor(base64Jwt: string) {
    const base64Url = base64Jwt.split('.')[1];
    const jsonPayload = JSON.parse(window.atob(base64Url));
    this.base64 = base64Jwt;
    this.sub = jsonPayload.sub;
    this.iat = new Date(+jsonPayload.iat * 1000);
    this.exp = new Date(+jsonPayload.exp * 1000);
  }
}
