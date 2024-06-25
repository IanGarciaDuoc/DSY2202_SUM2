import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';

/**
 * Componente para mostrar la lista de productos y gestionar la adición de productos al carrito de compras.
 */
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  /**
   * Servicio de carrito de compras para gestionar los productos en el carrito.
   */
  private cartService = inject(CartService);

  /**
   * Lista de productos disponibles.
   */
  Productos = [
    {
      id: 1,
      foto: "assets/images/1.png",
      nombre: "Cabernet Sauvignon Reserva",
      descripcion: "Vino tinto robusto con notas de frutas negras",
      precio: 15000,
    },
    {
      id: 2,
      foto: "assets/images/2.png",
      nombre: "Chardonnay Gran Reserva",
      descripcion: "Vino blanco elegante con toques de vainilla",
      precio: 18000,
    },
    {
      id: 3,
      foto: "assets/images/3.png",
      nombre: "Merlot Edición Limitada",
      descripcion: "Suave y aterciopelado con aromas a ciruela",
      precio: 22000,
    },
    {
      id: 4,
      foto: "assets/images/4.png",
      nombre: "Sauvignon Blanc Orgánico",
      descripcion: "Fresco y cítrico, perfecto para el verano",
      precio: 16500,
    },
    {
      id: 5,
      foto: "assets/images/5.png",
      nombre: "Carmenere Premium",
      descripcion: "Intenso y especiado, orgullo chileno",
      precio: 19500,
    },
    {
      id: 6,
      foto: "assets/images/6.png",
      nombre: "Pinot Noir Selección Especial",
      descripcion: "Delicado y afrutado, ideal para carnes blancas",
      precio: 21000,
    },
    {
      id: 7,
      foto: "assets/images/10.png",
      nombre: "Pack Degustación Tintos",
      descripcion: "Selección de 3 vinos tintos premium",
      precio: 45000,
    },
    {
      id: 8,
      foto: "assets/images/20.png",
      nombre: "Pack Blancos Refrescantes",
      descripcion: "Colección de 3 vinos blancos varietales",
      precio: 40000,
    },
    {
      id: 9,
      foto: "assets/images/30.png",
      nombre: "Pack Maridaje Gourmet",
      descripcion: "4 vinos seleccionados para acompañar comidas",
      precio: 65000,
    },
    {
      id: 10,
      foto: "assets/images/40.png",
      nombre: "Pack Celebración",
      descripcion: "2 vinos premium y 1 espumante",
      precio: 55000,
    },
    {
      id: 11,
      foto: "assets/images/50.png",
      nombre: "Pack Descubrimiento",
      descripcion: "5 vinos de diferentes cepas para explorar",
      precio: 70000,
    },
    {
      id: 12,
      foto: "assets/images/60.png",
      nombre: "Pack Coleccionista",
      descripcion: "3 vinos de añadas especiales",
      precio: 90000,
    },
  ];

  /**
   * Agrega un producto al carrito de compras.
   *
   * @param producto - El producto que se va a agregar al carrito.
   */
  agregarAlCarrito(producto: any) {
    this.cartService.addToCart(producto);
    console.log('Producto agregado al carrito:', producto);
  }
}