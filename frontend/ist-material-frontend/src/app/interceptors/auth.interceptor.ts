import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from 'src/global/globals';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private globals: Globals ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authUri = this.globals.backendUri + '/login';
    const itemsUri = this.globals.backendUri + '/items';

    // Do not intercept authentication requests or if no user is logged in
    if (req.url === authUri || !this.authService.isLoggedIn() || req.url === itemsUri) {
      //console.log('Unauthenticated Request');
      return next.handle(req);
    }
    let token:string = localStorage.authToken.replace(/["]+/g, '') // remove the double quotes of the string
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authReq);
  }
}
