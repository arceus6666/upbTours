export class Estacion {
  id: number;
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
  id: number;
  nombre: string;
  encargado: string;
  estado: string;
  codigo: string;
}
