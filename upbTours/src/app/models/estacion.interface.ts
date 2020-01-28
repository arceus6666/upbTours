export class Estacion {
  id: string;
  nombre: string;
  encargado: string;
  estado: string;
  codigo: string;

  constructor(id, nombre, encargado, estado, codigo) {
    this.id = id;
    this.nombre = nombre;
    this.encargado = encargado;
    this.estado = estado;
    this.codigo = codigo;
  }
}

export interface IEstacion {
  id?: string;
  estado?: string;
  nombre: string;
  encargado: string;
  codigo: string;
}
