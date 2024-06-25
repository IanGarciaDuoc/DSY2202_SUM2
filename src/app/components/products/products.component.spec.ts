import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';

/**
 * Descripción: Pruebas unitarias para el componente ProductsComponent.
 */
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let cartService: CartService;

  /**
   * Configuración inicial del entorno de pruebas para ProductsComponent.
   * Se ejecuta de forma asíncrona antes de cada prueba.
   */
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ProductsComponent], // Importa el componente standalone
      providers: [CartService] // Provee el servicio de carrito de compras
    }).compileComponents();
  }));

  /**
   * Configuración adicional antes de cada prueba.
   * Crea una instancia del componente y detecta cambios en la vista.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  /**
   * @description Prueba para verificar que el componente se crea correctamente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @description Prueba para verificar que la lista de productos se define correctamente.
   */
  it('debería tener una lista de productos definida', () => {
    expect(component.Productos.length).toBeGreaterThan(0);
  });

  /**
   * @description Prueba para verificar que el método agregarAlCarrito añade un producto al carrito de compras.
   */
  it('debería agregar un producto al carrito de compras', () => {
    spyOn(cartService, 'addToCart').and.callThrough();
    const producto = component.Productos[0];
    component.agregarAlCarrito(producto);
    expect(cartService.addToCart).toHaveBeenCalledWith(producto);
  });
});
