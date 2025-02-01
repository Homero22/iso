export interface Temas{
    tema: string; // Tema de la capacitación
    objetivo: string; // Objetivo de la capacitación
    dirigido_a: string; // Dirigido a
    instructor: string; // Instructor
    recursos: string; // Recursos utilizados
    duracion_horas: number; // Duración en horas
    numero_participantes: number; // Número de participantes
    mes: string; // En qué mes
    presupuesto: number; // Presupuesto
    indicador: string; // Indicador
    acciones_realizadas: number; // Acciones realizadas
    acciones_planificadas: number; // Acciones planificadas
    responsable: string; // Responsable
    indice_eficacia: number;
}
 export interface PlanCapacitaciones {
    temas: Temas[]; // Lista de temas
    codigo: string; // Código
    fecha_revision: string; // Fecha de revisión
    fecha_elaboracion: string; // Fecha de elaboración
    total_participantes: number; // Total participantes
    total_horas: number; // Total horas
    elaborado_por: string; // Elaborado por
    revisado_por: string; // Revisado por
    aprobado_por: string; // Aprobado por
    empresa: string; // Nombre de la empresa
    firma_elaborador: string; // Firma del elaborador
    firma_revisor: string; // Firma del revisor
    firma_aprobador: string; // Firma del aprobador
    total_presupuesto: number;
    promedio_indice_eficacia: number;
    anio: number;
 }