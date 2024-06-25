import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Función para inicializar la aplicación Angular.
 * Utiliza `bootstrapApplication` para iniciar el componente principal `AppComponent`
 * con la configuración especificada en `config`.
 * 
 * @returns {Promise<void>} Una promesa que se resuelve cuando la aplicación se ha inicializado.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
