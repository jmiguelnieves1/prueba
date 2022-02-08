import { Component, OnInit } from '@angular/core';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './interfaces/estudiante.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  logo: string = '../assets/selaski.png';
  estudiantes: Estudiante[] = [];
  isEdit: boolean = false;
  isCreate: boolean = false;
  orderBy: string = 'Seleccione una opcion';

  errorNombre: boolean = false;
  errorApellido: boolean = false;
  errorTelefono: boolean = false;
  errorEdad: boolean = false;

  estudiante: Estudiante = {
    nombre: '',
    apellido: '',
    telefono: '',
    id: 0,
    edad: 0
  }

  constructor(
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
      this.estudiantes = this.estudianteService.obtenerEstudiantes();
  }

  eliminarEstudiante(id: number) {
    this.estudiantes = this.estudianteService.eliminarEstudiante(id);
  }

  AEditarEstudiante(estudiante: Estudiante) {
    this.isEdit = true;
    this.estudiante = {...estudiante};
  }

  editarCrearEstudiante(id: number) {
    this.validarEstudiante(this.estudiante);
    if(this.errorApellido || this.errorEdad || this.errorNombre || this.errorTelefono) {
      return;
    }
    if(this.isEdit) {
      this.estudiantes = this.estudianteService.actualizarEstudiante(id, this.estudiante);
      this.isEdit = false; 
    } else if(this.isCreate) {
      this.estudiantes = this.estudianteService.crearEstudiante(this.estudiante);
      this.isCreate = false;
    }
    this.limpiarEstudiante();
  }

  cambiarOrden(event: any) {
    const key: string = event.target.value;

    if(key === 'edad' || key === 'id') {
      this.estudiantes.sort((x, y) => 
        x[key] > y[key] ? 1 :
        x[key] < y[key] ? -1 :
        0
      );
    }
        

    // switch(key) {
    //   case 'nombre':
    //     this.estudiantes.sort((x, y) => {
    //       if (x.nombre > y.nombre) { return 1; }
    //       if (x.nombre < y.nombre) { return -1; }
    //       return 0;
    //     });
    //     break;
    //   case 'apellido':
    //       this.estudiantes.sort((x, y) => {
    //         if (x.apellido > y.apellido) { return 1; }
    //         if (x.apellido < y.apellido) { return -1; }
    //         return 0;
    //       });
    //       break;
    //     case 'edad':
    //         this.estudiantes.sort((x, y) => {
    //           if (x.edad > y.edad) { return 1; }
    //           if (x.edad < y.edad) { return -1; }
    //           return 0;
    //         });
    //         break;
    //       case 'id':
    //         this.estudiantes.sort((x, y) => {
    //           if (x.id > y.id) { return 1; }
    //           if (x.id < y.id) { return -1; }
    //           return 0;
    //         });
    //         break;
    // }
      
      console.log('me ordene');
      console.log(this.estudiantes);
    
    
  }

  private validarEstudiante(estudiante: Estudiante) {
    this.errorApellido = false;
    this.errorNombre = false;
    this.errorEdad = false;
    this.errorTelefono = false;
    if(!estudiante.nombre || estudiante.nombre.length < 3) {
      this.errorNombre = true;
    }
    if(!estudiante.edad || estudiante.edad < 1 || typeof estudiante.edad !== 'number') {
      this.errorEdad = true;
    }
    if(!estudiante.telefono || estudiante.telefono.length < 5) {
      this.errorTelefono = true;
    }
    if(!estudiante.apellido || estudiante.apellido.length < 3) {
      this.errorApellido = true;
    }
  }

  private limpiarEstudiante() {
    this.estudiante = {
      nombre: '',
      apellido: '',
      telefono: '',
      id: 0,
      edad: 0
    }
  }
}