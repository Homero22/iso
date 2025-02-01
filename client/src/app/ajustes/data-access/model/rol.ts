export interface Rol {
    int_rol_id: number;
    str_rol_nombre: string;
    str_rol_descripcion: string;
    str_rol_estado: string;
    dt_rol_fecha_creacion: Date;
    dt_rol_fecha_actualizacion: Date;
}

export const initRol = {
    int_rol_id: 0,
    str_rol_nombre: '',
    str_rol_descripcion: '',
    str_rol_estado: '',
    dt_rol_fecha_creacion: new Date(),
    dt_rol_fecha_actualizacion: new Date(),
}

export interface RolResponse {
    body: Rol[];
    message: string;
    status: number;
}