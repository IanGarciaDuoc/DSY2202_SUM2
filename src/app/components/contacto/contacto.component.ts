import { Component } from '@angular/core';

/**
 * Componente de contacto de la aplicación.
 * 
 * Este componente es standalone, lo que significa que no requiere ser declarado
 * en un módulo Angular. Está diseñado para manejar la vista de contacto de la aplicación.
 */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  // Aquí se pueden agregar propiedades y métodos necesarios para la funcionalidad del componente.
}
