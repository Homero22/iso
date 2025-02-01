export interface PerfilUsuario {
  int_usuario_id: number;
  str_usuario_nombres: string;
  str_usuario_apellidos: string;
  str_usuario_email?: string;
  str_usuario_cedula?: string;
  str_usuario_telefono?: string;
  str_usuario_estado: string;
  str_usuario_tipo?: string;
  str_usuario_clave: string;
  dt_usuario_fecha_registro: Date;
  dt_fecha_creacion: Date;
  dt_fecha_actualizacion: Date;
}

export interface PerfilUsuarioModel {
  status: boolean;
  message: string;
  body: PerfilUsuario;
}

export interface Sesion {
  int_sesion_id: number;
  int_usuario_sistema_empresa_id: number;
  str_sesion_token: string;
  str_sesion_ip: string;
  str_sesion_navegador: string;
  str_sesion_dispositivo: string;
  dt_fecha_creacion: Date;
  dt_fecha_actualizacion: Date;
}

export interface SesionModel {
  status: boolean;
  message: string;
  body: Sesion;
}

export interface NuevaClave {
  int_usuario_id: number;
  str_usuario_clave: string;
  str_usuario_clave_confirmar: string;
}

export interface NuevaClaveModel {
  status: boolean;
  message: string;
  body: NuevaClave;
}
