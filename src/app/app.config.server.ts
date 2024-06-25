import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Configuración específica para la renderización en el servidor.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()  // Proveedor para la renderización en el servidor.
  ]
};

/**
 * Configuración final de la aplicación que combina la configuración del cliente y del servidor.
 * 
 * @constant {ApplicationConfig} config - Configuración combinada de la aplicación.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
