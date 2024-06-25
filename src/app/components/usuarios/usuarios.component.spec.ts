import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule } from '@angular/forms';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponent);
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
   * Verifica que los usuarios se cargan correctamente desde el localStorage.
   */
  it('debería cargar usuarios desde localStorage', () => {
    const usuarios = [
      { nombre: 'Usuario1', email: 'usuario1@example.com', password: '123456' },
      { nombre: 'Usuario2', email: 'usuario2@example.com', password: 'abcdef' }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    component.cargarUsuarios();

    expect(component.usuarios.length).toBe(2);
    expect(component.usuarios).toEqual(usuarios);
  });

  /**
   * Verifica que un usuario se elimina correctamente.
   */
  it('debería eliminar un usuario', () => {
    component.usuarios = [
      { nombre: 'Usuario1', email: 'usuario1@example.com', password: '123456' },
      { nombre: 'Usuario2', email: 'usuario2@example.com', password: 'abcdef' }
    ];
    component.eliminarUsuario('usuario1@example.com');

    expect(component.usuarios.length).toBe(1);
    expect(component.usuarios[0].email).toBe('usuario2@example.com');
  });

  /**
   * Verifica que un usuario se selecciona para edición correctamente.
   */
  it('debería editar un usuario', () => {
    const usuario = { nombre: 'Usuario1', email: 'usuario1@example.com', password: '123456' };
    component.editarUsuario(usuario);

    expect(component.usuarioSeleccionado).toEqual(usuario);
    // Verificar si el modal se muestra (esto puede necesitar un enfoque diferente dependiendo de tu implementación real)
  });

  /**
   * Verifica que un usuario se actualiza correctamente.
   */
  it('debería actualizar un usuario', () => {
    component.usuarios = [
      { nombre: 'Usuario1', email: 'usuario1@example.com', password: '123456' },
      { nombre: 'Usuario2', email: 'usuario2@example.com', password: 'abcdef' }
    ];
    component.usuarioSeleccionado = { nombre: 'UsuarioActualizado', email: 'usuario1@example.com', password: '654321' };

    component.actualizarUsuario();

    const updatedUser = component.usuarios.find(u => u.email === 'usuario1@example.com');
    expect(updatedUser).toBeTruthy();
    if (updatedUser) {
      expect(updatedUser.nombre).toBe('UsuarioActualizado');
      expect(updatedUser.password).toBe('654321');
    }
  });
});
