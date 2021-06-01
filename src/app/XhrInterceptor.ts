import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: 'Basic ' + btoa('java' + ':' + 'java')
    });
    const xhr = req.clone({headers});
    return next.handle(xhr);
  }
}
