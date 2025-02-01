export interface CentroEmpresa {
    str_centro_nombre: string;
    str_centro_direccion: string;
    str_centro_telefono: string;
    dt_fecha_creacion: Date;
    int_empresa_id: number;
    int_centro_id: number;
}

export const initCentroEmpresa = {
    str_centro_nombre: '',
    str_centro_direccion: '',
    str_centro_telefono: '',
    dt_fecha_creacion: new Date(),
    int_empresa_id: 0,
    int_centro_id: 0
}

export interface CrearCentroEmpresa {
    str_centro_nombre: string;
    str_centro_direccion: string;
    str_centro_telefono: string;
    int_empresa_id: number;
}

export interface DataCentros {
    status: boolean;
    message: string;
    body: CentroEmpresa[];
  }