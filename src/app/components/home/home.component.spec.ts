import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';

/**
 * Pruebas unitarias para el componente HomeComponent.
 */
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  /**
   * Configuración inicial del entorno de pruebas para HomeComponent.
   * 
   * Se ejecuta de forma asíncrona antes de cada prueba.
   * Configura el módulo de pruebas importando el componente HomeComponent.
   */
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent] // Importa el componente standalone
    }).compileComponents();
  }));

  /**
   * Configuración adicional antes de cada prueba.
   * 
   * Crea una instancia del componente y detecta cambios en la vista.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba para verificar que el componente se crea correctamente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas aquí según las funcionalidades de tu componente

  /**
   * Ejemplo de prueba adicional: verificar que el título del componente sea correcto.
   */
 

  
  
});
