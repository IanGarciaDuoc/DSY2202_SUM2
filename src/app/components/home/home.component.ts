import { Component } from '@angular/core';

/**
 * @description Componente Home que se muestra como la página principal de la aplicación.
 */
@Component({
  selector: 'app-home', // @description Selector del componente para ser usado en el HTML.
  standalone: true, // @description Indica que el componente es independiente y no necesita ser declarado en un módulo.
  imports: [], // @description Lista de módulos que este componente importa. En este caso, está vacío.
  templateUrl: './home.component.html', // @description Ruta del archivo HTML del template del componente.
  styleUrls: ['./home.component.css'] // @description Ruta del archivo CSS con los estilos del componente.
})
export class HomeComponent {

  /**
   * @description Método de ejemplo que aún no está implementado.
   * @throws {Error} Lanza un error indicando que el método no está implementado.
   */
  someMethod() {
    throw new Error('Method not implemented.');
  }

  // @description Clase vacía del componente Home. Aquí se pueden agregar propiedades y métodos según sea necesario.
}
