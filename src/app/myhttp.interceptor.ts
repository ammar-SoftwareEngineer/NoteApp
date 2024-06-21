import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (localStorage.getItem("token") !== null) {
      let myToken: any = { token: '3b8ny__' + localStorage.getItem('token') };
      request = request.clone({
        setHeaders: myToken
      })
    }
    return next.handle(request);
  }
}
