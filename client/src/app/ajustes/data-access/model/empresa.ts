
export interface Empresa {
    dt_fecha_creacion: string;
    int_empresa_id: number;
    str_empresa_direccion: string;
    str_empresa_email: string;
    str_empresa_nombre: string;
    str_empresa_telefono: string;
}

export const initEmpresa = {
    dt_fecha_creacion: '',
    int_empresa_id: 0,
    str_empresa_direccion: '',
    str_empresa_email: '',
    str_empresa_nombre: '',
    str_empresa_telefono: ''
}

export interface CrearEmpresa {
    str_empresa_direccion: string;
    str_empresa_email: string;
    str_empresa_nombre: string;
    str_empresa_telefono: string;
    dt_fecha_creacion: string;
    int_cliente_id: number;
}
    