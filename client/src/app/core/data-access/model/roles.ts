export interface DataRoles {
  id_perfil: number;
  per_id: number;
  descripcion: string;
  usuario: string;
  rol: string;
  estadoperfil: string;
  fechacreacion: string;
  fechaact: string;
}
export interface RolesModel {
  status: string;
  body: DataRoles[];
}

export interface DataDBRoles {
  int_id_rol: number;
  str_nombre_rol: string;
  str_descripcion_rol: string;
  enum_estado_rol: string;
  str_icono_rol: string;
  dt_fecha_creacion: string;
  dt_fecha_actualizacion: string;
}

export interface DataDBRolesModel {
  status: string;
  body: DataDBRoles[];
}
