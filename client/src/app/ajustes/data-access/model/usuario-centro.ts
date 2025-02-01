export interface UsuarioCentro{
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
    int_usuario_sistema_empresa_id: number;
    int_rol_id: number;
    str_rol_nombre: string;
    int_empresa_id: number;
  }

  export const initUsuarioCentro = {
    int_usuario_id: 0,
    str_usuario_nombres: '',
    str_usuario_apellidos: '',
    str_usuario_email: '',
    str_usuario_cedula: '',
    str_usuario_telefono: '',
    str_usuario_estado: '',
    str_usuario_tipo: '',
    str_usuario_clave: '',
    dt_usuario_fecha_registro: new Date(),
    dt_fecha_creacion: new Date(),
    dt_fecha_actualizacion: new Date(),
    int_usuario_sistema_empresa_id: 0,
    int_rol_id: 0,
    str_rol_nombre: '',
    int_empresa_id: 0,
  }



  export interface CrearUsuarioCentro {
    int_sistema_id: number;
    int_centro_id: number;
    str_usuario_nombres: string;
    str_usuario_apellidos: string;
    str_usuario_email: string;
    str_usuario_cedula: string;
    str_usuario_telefono: string;
    str_usuario_estado: string;
    str_usuario_tipo: string;
    str_usuario_clave: string;
    int_rol_id: number;
  }

