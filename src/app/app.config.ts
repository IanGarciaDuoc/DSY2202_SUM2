import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

/**
 * Configuración de la aplicación Angular.
 * 
 * Esta configuración define los proveedores necesarios para la detección de cambios, 
 * el enrutamiento y la hidratación del cliente.
 * 
 * @constant {ApplicationConfig} appConfig - Configuración de la aplicación.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor para la detección de cambios en la zona de Angular con coalescencia de eventos
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Proveedor para configurar el enrutador con las rutas de la aplicación
    provideRouter(routes),
    // Proveedor para la hidratación del cliente, optimizando la carga de la aplicación
    provideClientHydration()
  ]
};
