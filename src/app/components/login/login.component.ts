import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * @description Componente de inicio de sesión que maneja la lógica de autenticación del usuario.
 */
@Component({
  selector: 'app-login', // @description Selector del componente para ser usado en el HTML.
  standalone: true, // @description Indica que el componente es independiente y no necesita ser declarado en un módulo.
  imports: [CommonModule, ReactiveFormsModule], // @description Módulos que este componente importa.
  templateUrl: './login.component.html', // @description Ruta del archivo HTML del template del componente.
  styleUrls: ['./login.component.css'] // @description Ruta del archivo CSS con los estilos del componente.
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup; // @description Formulario reactivo para el inicio de sesión.
  mensajeError: string | null = null; // @description Mensaje de error para mostrar en la interfaz.
  correoNoRegistrado = false; // @description Bandera para indicar si el correo no está registrado.

  /**
   * @description Constructor del componente. Inyecta FormBuilder y Router.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Router} router - Servicio de enrutamiento para la navegación.
   */
  constructor(private fb: FormBuilder, private router: Router) {}

  /**
   * @description Inicializa el componente y configura el formulario reactivo.
   */
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // @description Campo de correo electrónico con validaciones.
      password: ['', Validators.required] // @description Campo de contraseña con validación de requerido.
    });
  }

  /**
   * @description Maneja el envío del formulario de inicio de sesión.
   * Verifica las credenciales del usuario y maneja la lógica de inicio de sesión.
   */
  submitForm(): void {
    if (this.formLogin.valid) {
      const email = this.formLogin.get('email')?.value; // @description Obtiene el valor del campo email.
      const password = this.formLogin.get('password')?.value; // @description Obtiene el valor del campo password.

      // @description Obtener usuarios del localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // @description Verificar si el correo electrónico está registrado
      const usuarioRegistrado = usuarios.find((usuario: any) => usuario.email === email);

      if (usuarioRegistrado) {
        if (usuarioRegistrado.password === password) {
          // @description Guardar la sesión del usuario en localStorage
          localStorage.setItem('sesionUsuario', JSON.stringify(usuarioRegistrado));
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('nombre', usuarioRegistrado.nombre);

          console.log('Inicio de sesión correcto. Nombre del usuario almacenado:', usuarioRegistrado.nombre);

          this.mensajeError = 'Inicio de sesión correcto';
          setTimeout(() => {
            this.mensajeError = null;
            // @description Navegar a la página principal
            this.router.navigate(['/']);
          }, 2000);
          this.correoNoRegistrado = false;
        } else {
          this.mensajeError = 'La contraseña ingresada es incorrecta';
        }
      } else {
        this.mensajeError = 'El correo electrónico no está registrado';
        this.correoNoRegistrado = true;
      }
    } else {
      this.mensajeError = 'Por favor, complete todos los campos correctamente';
    }
  }

  /**
   * @description Método no implementado para manejar el registro de usuario.
   * @throws {Error} - Método no implementado.
   */
  onRegistroClick() {
    throw new Error('Method not implemented.');
  }
}
