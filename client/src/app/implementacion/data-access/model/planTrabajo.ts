export interface Accion {
    descripcion: string; // Descripción de la acción
    recursos: string; // Recursos necesarios
    responsable: string; // Responsable de la acción
    fechas_compromiso: string[]; // Fechas de compromiso
    criterios_exito: string; // Criterios de éxito
    metodos: string; // Métodos de evaluación
    alcance: string; // Alcance de la acción
    acciones_realizadas: number; // Acciones realizadas
    acciones_planificadas: number; // Acciones planificadas
    indicador_eficacia: number; // Indicador de eficacia
    fecha_revision_efectividad: string; // Fecha de revisión de efectividad
    accion_revision: string; // Acción de revisión
    responsable_revision: string; // Responsable de la revisión
}
export interface PlanTrabajo {
    acciones: Accion[]; // Lista de acciones
    codigo: string; // Código del plan de trabajo
    fecha_elaboracion: string; // Fecha de elaboración del plan de trabajo
    fecha_edicion: string; // Fecha de edición del plan de trabajo
    responsable_sst: string; // Responsable de SST
    empresa: string; // Nombre de la empresa
    elaborado_por: string; // Nombre del elaborador del plan de trabajo
    revisado_por: string; // Nombre del revisor del plan de trabajo
    aprobado_por: string; // Nombre del aprobador del plan de trabajo
    firma_elaborador: string; // Firma del elaborador
    firma_revisor: string; // Firma del revisor
    firma_aprobador: string; // Firma del aprobador
    indice_eficacia: number; // Índice de eficacia
  }
  


  