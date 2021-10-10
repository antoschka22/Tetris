import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Globals } from 'src/global/globals';
import { AuthRequest } from 'src/models/AuthRequest';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authBaseUri: string = this.globals.backendUri + '/login';

  constructor(private httpClient: HttpClient, private globals: Globals) {}

  /**
   * Login in the user. If it was successful, a valid JWT token will be stored
   *
   * @param authRequest User data
   */
  loginUser(authRequest: AuthRequest, keepLogin: boolean): Observable<string> {
    // console.log(keepLogin);
    return this.httpClient
      .post(this.authBaseUri, authRequest, { responseType: 'text' })
      .pipe(tap((authResponse: string) => this.setToken(authResponse, keepLogin)));
  }

  /**
   * Check if a valid JWT token is saved in the localStorage
   */
  isLoggedIn(): boolean {
    let token = this.getToken();
    if (token == null) {
      return false;
    } else {
      let exp = this.getTokenExpirationDate(token);
      if (exp == null) {
        return false;
      } else {
        return exp.valueOf() > new Date().valueOf();
      }
    }
  }

  logoutUser(): void {
    // console.log('Logout');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }

  getToken(): string | null {
    let token = localStorage.getItem('authToken');
    if (token == null) {
      token = sessionStorage.getItem('authToken');
    }
    return token;    
  }

  /**
   * Returns the user role based on the current token
   */
  getUserRole() {
    let token = this.getToken();
    if (token != null) {
      const decoded: any = jwt_decode(token);
      const authInfo: string[] = decoded.role;
      // console.log(authInfo);
      if (authInfo.includes('admin')) {
        return 'ADMIN';
      } else if (authInfo.includes('user')) {
        return 'USER';
      }
    }
    return 'UNDEFINED';
  }
  
  // decodes the token and returns the id of user
  getIdFromToken(){
    let token = this.getToken();
    if (token != null){
      const decoded: any = jwt_decode(token);
      return decoded.sub
    }
    return "Error"
  }

  private setToken(authResponse: string, keepLogin: boolean) {
    if (keepLogin) {
      localStorage.setItem('authToken', authResponse);
    } else {
      sessionStorage.setItem('authToken', authResponse);
    }
  }

  private getTokenExpirationDate(token: string): Date | null{
    const decoded: any = jwt_decode(token);
    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

}