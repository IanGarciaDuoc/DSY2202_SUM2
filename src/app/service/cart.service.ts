import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interfaz que representa un artículo del carrito.
 */
export interface CartItem {
  id: number;
  foto: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

/**
 * Servicio que maneja la lógica del carrito de compras.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  /**
   * Constructor del servicio.
   * Inicializa el carrito con los datos almacenados en localStorage si están disponibles.
   */
  constructor() { 
    if (this.isLocalStorageAvailable()) {
      this.cartSubject.next(JSON.parse(localStorage.getItem("carrito") || "[]"));
      this.cartItems = JSON.parse(localStorage.getItem("carrito") || "[]");
    }
  }

  /**
   * Verifica si el almacenamiento local está disponible.
   * 
   * @returns {boolean} Verdadero si el almacenamiento local está disponible, falso de lo contrario.
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Método para agregar un producto al carrito.
   * Si el producto ya existe en el carrito, incrementa su cantidad.
   * 
   * @param {any} producto - El producto que se va a agregar al carrito.
   */
  addToCart(producto: any): void {
    const existingItem = this.cartItems.find(item => item.id === producto.id);
    if (existingItem) {
      existingItem.cantidad++;
    } else {
      this.cartItems.push({
        id: producto.id,
        foto: producto.foto,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      });
    }
    console.log("Agregado al carrito");
    this.updateCart();
  }

  /**
   * Método para obtener los artículos del carrito como un Observable.
   * 
   * @returns {Observable<CartItem[]>} Un Observable de los artículos del carrito.
   */
  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  /**
   * Método para eliminar un producto del carrito.
   * 
   * @param {number} productId - El ID del producto que se va a eliminar del carrito.
   */
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  /**
   * Método para vaciar el carrito.
   */
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  /**
   * Método para obtener el total del carrito.
   * 
   * @returns {number} El total del carrito.
   */
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  /**
   * Método privado para actualizar el BehaviorSubject y sincronizar el carrito con el almacenamiento local.
   */
  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    localStorage.setItem("carrito", JSON.stringify(this.cartItems));
  }
}
