import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; // Importa las utilidades necesarias para pruebas unitarias de Angular
import { NavbarComponent } from './navbar.component'; // Importa el componente Navbar
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute para manejar rutas en Angular
import { of } from 'rxjs'; // Importa 'of' de RxJS para crear observables

describe('NavbarComponent', () => {
  let component: NavbarComponent; // Declaración del componente que se va a probar
  let fixture: ComponentFixture<NavbarComponent>; // Declaración del fixture que facilita el acceso al DOM del componente

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent], // Importa el componente standalone en lugar de declararlo
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } } // Proveer un mock para ActivatedRoute con un observable vacío
      ]
    }).compileComponents();

    // Crear una instancia del componente y su fixture
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectar cambios para que el componente se renderice correctamente
  }));

  /**
   * Verifica que el componente se crea correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (existente)
  });

  // Más pruebas aquí
});
