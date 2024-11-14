export interface Usuario {
  id: string;
  idProfesor: string;
  idAlumno: string;
  nombre: string;
  apellido: string;
  rut: string;
  edad: number;
  correo: string;
  carrera: string;
  password: string;
  genero: string;
  seccion: string;
  tipo: string; // Puede ser 'alumno' o 'profesor'
}


export interface Asignatura {
  id: string;
  nombre: string;
  codigo: string;
  seccion: string;
}
export interface Asistencia {
  idAsiganatura: string;
  profesorId: string;
  seccion: string;
  alumnoId: string;
  fecha: Date;
  asistencia: boolean;
}

export interface Seccion {
  id: string;
  nombre: string;
  asignatura: Asignatura;
}

export interface Clases {
  id: string;
  claseId: string;
  nombre: string;
  fecha: Date;
}



export interface Resultado {
  usuario: Usuario;
  asignatura: Asignatura;
  seccion: Seccion;
}