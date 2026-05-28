<<<<<<< HEAD
import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
=======
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
<<<<<<< HEAD
import { KeycloakService } from './services/keycloak.service';

export function initKeycloakFactory(kc: KeycloakService) {
  return () => kc.init();
}
=======
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
<<<<<<< HEAD
    importProvidersFrom(HttpClientModule),
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initKeycloakFactory,
      deps: [KeycloakService],
      multi: true,
    }
=======
    importProvidersFrom(HttpClientModule)
>>>>>>> 7e1f99e (Add Keycloak and New Frontend with BFF authentication implementation)
  ]
};
