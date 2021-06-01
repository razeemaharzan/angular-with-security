import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppService} from './app.service';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AppService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authenticationService.authenticated) {

      const authReq = req.clone({
        headers: new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Basic ${btoa(this.authenticationService.username + ':' + this.authenticationService.password)}`
        })
      });

      return next.handle(authReq);

    } else {
      const xhr = req.clone({
        headers: req.headers.set( 'X-Requested-With', 'XMLHttpRequest')
      });
      return next.handle(xhr);
    }
    return next.handle(req);
  }
}
