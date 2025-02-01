export interface ObjetivoSST {
  codigo: string;
  fecha_edicion: string;
  fecha_elaboracion: string;
  empresa: string;
  elaborado_por: string;
  revisado_por: string;
  aprobado_por: string;
  fecha_revision: string;
  firma_elaborador: string;
  firma_revisor: string;
  firma_aprobador: string;
  data: Data;
  indiceCumplimiento: number;
  totalPresupuesto: number;
}

export interface Data {
  compromisos: Compromiso[];
}

export interface Compromiso {
  compromiso: string;
  objetivos: Objetivo[];
}

export interface Objetivo {
  descripcion: string;
  metas: Meta[];
}

export interface Meta {
  descripcion: string;
  indicador: string;
  indiceEficacia: number;
  requisitosISO: string[];
  responsable: string;
  fecha_inicio: string;
  fecha_final: string;
  presupuesto: number;
  actividades_planificadas: number;
  actividades_realizadas: number;
}
