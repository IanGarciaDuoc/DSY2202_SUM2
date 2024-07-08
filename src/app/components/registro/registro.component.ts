import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios.service';
import { Usuarios } from '../../models/usuarios.model';

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

  constructor(private fb: FormBuilder,private usuariosService: UsuariosService) {}

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
        this.passwordMatchValidator
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };

  }
  SubmitForm() {
    if (this.formRegistro.valid) {
      const nuevoUsuario: Usuarios = {
        nombre: this.formRegistro.value.nombre,
        email: this.formRegistro.value.email,
        password: this.formRegistro.value.password,
        id: '',
        rol: 'usuarios'
      };

      this.usuariosService.RegistrarUsuario2(nuevoUsuario).then(
        () => {
          this.mensajeExito = 'Usuario registrado exitosamente.';
          this.mensajeError = null;
          this.formRegistro.reset();
        },
        error => {
          this.mensajeError = 'Hubo un error al registrar el usuario.';
          this.mensajeExito = null;
        }
      );
    } else {
      this.mensajeError = 'Por favor, corrige los errores en el formulario.';
      this.mensajeExito = null;
    }
  }
}
