import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { ProductosService } from '../../service/productos.service';
import { Productos } from '../../models/productos.model';

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
export class ProductsComponent implements OnInit {
  /**
   * Servicio de carrito de compras para gestionar los productos en el carrito.
   */
  private cartService = inject(CartService);

  /**
   * Lista de productos disponibles.
   */
  constructor(private productosservice: ProductosService)  {  }
  Productos : Productos [] = []

  ngOnInit(): void {
  
    this.productosservice.ObtenerProductos().subscribe(res=>{
      this.Productos = res;
      console.log(res);
    });
  }
  
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