import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, LoginComponent], // Importa el componente standalone
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  /**
   * Prueba para verificar que el componente se crea correctamente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba para verificar que el formulario se inicializa en ngOnInit.
   */
  it('debería inicializar formLogin en ngOnInit', () => {
    component.ngOnInit();
    expect(component.formLogin).toBeDefined();
    expect(component.formLogin.controls['email']).toBeDefined();
    expect(component.formLogin.controls['password']).toBeDefined();
  });

  /**
   * Prueba para verificar que se muestra un mensaje de error cuando el formulario es inválido.
   */
  it('debería mostrar mensaje de error para formulario inválido', () => {
    component.submitForm();
    expect(component.mensajeError).toBe('Por favor, complete todos los campos correctamente');
  });

  /**
   * Prueba para verificar que se muestra un mensaje de error cuando el correo electrónico no está registrado.
   */
  it('debería mostrar mensaje de error para correo electrónico no registrado', () => {
    localStorage.setItem('usuarios', JSON.stringify([]));
    component.formLogin.setValue({ email: 'unregistered@example.com', password: '123456' });
    component.submitForm();
    expect(component.mensajeError).toBe('El correo electrónico no está registrado');
    expect(component.correoNoRegistrado).toBeTrue();
  });

  /**
   * Prueba para verificar que se muestra un mensaje de error cuando la contraseña es incorrecta.
   */
  it('debería mostrar mensaje de error para contraseña incorrecta', () => {
    const usuarios = [{ email: 'test@example.com', password: '123456' }];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    component.formLogin.setValue({ email: 'test@example.com', password: 'wrongpassword' });
    component.submitForm();
    expect(component.mensajeError).toBe('La contraseña ingresada es incorrecta');
  });

});
