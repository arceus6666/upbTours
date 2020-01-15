export class Estacion {
  id: number;
  nombre: string;
  encargado: string;
  estado: string;

  constructor(id, nombre, encargado, estado) {
    this.id = id;
    this.nombre = nombre;
    this.encargado = encargado;
    this.estado = estado;
  }
}
