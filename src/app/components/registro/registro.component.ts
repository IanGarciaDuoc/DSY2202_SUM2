import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formRegistro!: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder) {}

  /**
   * Inicializa el formulario de registro y sus validadores.
   */
  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  /**
   * Valida que las contraseñas coincidan.
   * @param {AbstractControl} group - El grupo de controles del formulario.
   * @returns {ValidationErrors | null} Los errores de validación, si los hay.
   */
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  /**
   * Valida la fortaleza de la contraseña.
   * @param {AbstractControl} control - El control del formulario que contiene la contraseña.
   * @returns {ValidationErrors | null} Los errores de validación, si los hay.
   */
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const errors: any = {};

    if (!/[A-Z]/.test(value)) {
      errors.missingUppercase = 'La contraseña debe contener al menos una letra mayúscula';
    }

    if (!/[a-z]/.test(value)) {
      errors.missingLowercase = 'La contraseña debe contener al menos una letra minúscula';
    }

    if (!/[0-9]/.test(value)) {
      errors.missingNumber = 'La contraseña debe contener al menos un número';
    }

    if (!/[@$!%*?&]/.test(value)) {
      errors.missingSpecial = 'La contraseña debe contener al menos un carácter especial (@$!%*?&)';
    }

    return Object.keys(errors).length ? errors : null;
  }

  /**
   * Verifica si un correo electrónico ya está registrado.
   * @param {string} email - El correo electrónico a verificar.
   * @returns {boolean} Verdadero si el correo ya está registrado, falso de lo contrario.
   */
  emailExists(email: string): boolean {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.some((u: any) => u.email === email);
  }

  /**
   * Envía el formulario de registro.
   */
  submitForm(): void {
    this.mensajeError = null; // Reiniciar el mensaje de error
    const email = this.formRegistro.get('email')?.value;

    if (this.emailExists(email)) {
      this.mensajeError = 'El correo electrónico ya se encuentra registrado';
      return;
    }

    if (this.formRegistro.valid) {
      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Asignar permisos en función del dominio del correo electrónico
      const permisos = email.endsWith('@admin.cl') ? 'admin' : 'cliente';

      const nuevoUsuario = {
        nombre: this.formRegistro.get('nombre')?.value,
        email: this.formRegistro.get('email')?.value,
        password: this.formRegistro.get('password')?.value,
        permisos: permisos
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      const nombreUsuario = this.formRegistro.get('nombre')?.value;
      this.mensajeExito = `¡${nombreUsuario}, tu información ha sido guardada exitosamente!`;

      setTimeout(() => {
        this.formRegistro.reset();
        this.mensajeExito = null;
      }, 3000);
    } else {
      this.mensajeError = 'Por favor, complete todos los campos correctamente';
    }
  }

  /**
   * Limpia el formulario de registro.
   */
  limpiarFormulario() {
    this.formRegistro.reset();
  }
}
