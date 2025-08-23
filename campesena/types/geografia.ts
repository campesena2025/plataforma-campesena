export interface Geografia {
  departamentos: Departamento[];
}
export interface Departamento {
  divipola: string;
  nombre: string;
  municipios: Municipio[];
}
export interface Municipio {
  divipola: string;
  nombre: string;
  veredas: Vereda[];
}
export interface Vereda {
  divipola: string;
  nombre: string;
}
