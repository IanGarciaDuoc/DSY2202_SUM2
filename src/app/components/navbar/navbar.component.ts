import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service'; // Ajusta la ruta según sea necesario
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUserName: string | null = 'Invitado';
  cartItems: any;
  userInfo: any;
  total: string | number | undefined;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente. Obtiene el nombre del usuario actual y la información del usuario,
   * y se suscribe a los cambios en los artículos del carrito.
   */
  ngOnInit(): void {
    // Obtener el nombre del usuario actual o asignar 'Invitado' si no está disponible
    this.currentUserName = this.authService.getNombre() || 'Invitado';
    // Obtener la información del usuario y parsearla desde JSON
    this.userInfo = JSON.parse(this.authService.getUserInfo());
    console.log(this.userInfo);
    // Suscribirse a los cambios en los artículos del carrito
    this.cartService.getCartItems().subscribe((e) => {
      this.cartItems = e;
    });
  }

  /**
   * Cierra la sesión del usuario y redirige a la página de login.
   */
  logout(): void {
    // Llamar al servicio de autenticación para cerrar la sesión
    this.authService.logout();
    // Asignar 'Invitado' al nombre del usuario actual
    this.currentUserName = 'Invitado';
    // Redirigir a la página de login
    this.router.navigate(['/login']);
  }

  /**
   * Elimina un artículo del carrito.
   * @param {any} arg0 - El artículo a eliminar.
   */
  removeFromCart(arg0: any): void {
    // Método no implementado para eliminar un artículo del carrito
    throw new Error('Method not implemented.');
  }

  /**
   * Vacía el carrito de compras.
   */
  clearCart(): void {
    // Método no implementado para vaciar el carrito de compras
    throw new Error('Method not implemented.');
  }
}
