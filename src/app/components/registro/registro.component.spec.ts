import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';
import { CommonModule } from '@angular/common';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, RegistroComponent] // Importa el componente standalone
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se crea correctamente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el formulario se inicializa correctamente en ngOnInit.
   */
  it('debería inicializar formRegistro en ngOnInit', () => {
    component.ngOnInit();
    expect(component.formRegistro).toBeDefined();
    expect(component.formRegistro.controls['nombre']).toBeDefined();
    expect(component.formRegistro.controls['email']).toBeDefined();
    expect(component.formRegistro.controls['password']).toBeDefined();
    expect(component.formRegistro.controls['confirmPassword']).toBeDefined();
  });

  /**
   * Verifica que se muestra un mensaje de error cuando el correo electrónico ya está registrado.
   */
  it('debería mostrar mensaje de error para correo electrónico ya registrado', () => {
    const usuarios = [{ email: 'test@example.com', nombre: 'Test', password: 'Test1234!', permisos: 'cliente' }];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    component.formRegistro.setValue({
      nombre: 'Test',
      email: 'test@example.com',
      password: 'Test1234!',
      confirmPassword: 'Test1234!'
    });

    component.submitForm();
    expect(component.mensajeError).toBe('El correo electrónico ya se encuentra registrado');
  });

  /**
   * Verifica que se muestra un mensaje de error cuando el formulario es inválido.
   */
  it('debería mostrar mensaje de error para formulario inválido', () => {
    component.submitForm();
    expect(component.mensajeError).toBe('Por favor, complete todos los campos correctamente');
  });

  /**
   * Verifica que un nuevo usuario se registra exitosamente.
   */
  it('debería registrar un nuevo usuario exitosamente', waitForAsync(() => {
    localStorage.setItem('usuarios', JSON.stringify([]));
    component.formRegistro.setValue({
      nombre: 'Nuevo Usuario',
      email: 'nuevo@usuario.com',
      password: 'Test1234!',
      confirmPassword: 'Test1234!'
    });

    component.submitForm();
    fixture.whenStable().then(() => {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      expect(usuarios.length).toBe(1);
      expect(usuarios[0].email).toBe('nuevo@usuario.com');
      expect(component.mensajeExito).toBe('¡Nuevo Usuario, tu información ha sido guardada exitosamente!');
    });
  }));

  /**
   * Verifica la validación de la fuerza de la contraseña.
   */
  it('debería validar la fuerza de la contraseña', () => {
    const passwordControl = component.formRegistro.controls['password'];
    passwordControl.setValue('weakpassword');
    const errors = component.passwordStrengthValidator(passwordControl);
    expect(errors).toEqual({
      missingUppercase: 'La contraseña debe contener al menos una letra mayúscula',
      missingNumber: 'La contraseña debe contener al menos un número',
      missingSpecial: 'La contraseña debe contener al menos un carácter especial (@$!%*?&)'
    });
  });

  /**
   * Verifica que las contraseñas coincidan.
   */
  it('debería validar que las contraseñas coincidan', () => {
    const form = component.formRegistro;
    form.controls['password'].setValue('Test1234!');
    form.controls['confirmPassword'].setValue('Test12345!');
    const errors = component.passwordMatchValidator(form);
    expect(errors).toEqual({ passwordMismatch: true });
  });
});