import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()), // pick up any class-based HTTP interceptors that are provided through DI using the HTTP_INTERCEPTORS token
    {
      provide: HTTP_INTERCEPTORS, // the special multi-token Angular looks at for HTTP interceptors
      useClass: TokenInterceptorService, // the service class that provides the interceptor
      multi: true, // supports multiple interceptors;
    },
  ],
};
