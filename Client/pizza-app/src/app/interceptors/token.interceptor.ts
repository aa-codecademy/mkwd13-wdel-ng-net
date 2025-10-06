import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      // we create cloned request to attach the authorization header
      // clone() returns a new HttpRequest instance with your changes applied and leaves the original request unchanged (immutability)
      // deep copy vs shallow copy
      // structuredClone metod (since ... does not work on multidimensional arrays and nested objects)
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      // if successful, send the cloned request with the attached authprization header
      return next.handle(clonedReq);
    }
    // if not successful, send the request without the attached authorization header (do not block the request from passing through)
    return next.handle(req);
  }
}
