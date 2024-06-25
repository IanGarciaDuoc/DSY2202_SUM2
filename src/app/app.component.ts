import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Componente raíz de la aplicación.
 * 
 * Este componente sirve como punto de entrada principal de la aplicación y contiene la barra de navegación
 * y el contenedor para las vistas de enrutamiento.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Título de la aplicación.
   */
  title = 'Tienda-Vinacho';
}
