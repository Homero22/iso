export interface Objetivos {
    descripcion: string; // Descripción del objetivo
    ges: string; // GES
    area_trabajo: string; // Área de trabajo
    numero_trabajadores: number; // Número de trabajadores
    tarea: string; // Tarea
    duracion_frecuencia: string; // Duración o frecuencia
    recursos_humanos: string; // Recursos humanos
    recursos_tecnicos: string; // Recursos técnicos
    cantidad_mediciones: number; // Cantidad de mediciones
    costo_dolares: number; // Costo en dólares
    recursos_economicos: number; // Recursos económicos
    fecha: string; // Fecha
    indicador: string; // Indicador
    acciones_realizadas: number; // Acciones realizadas
    acciones_planificadas: number; // Acciones planificadas
    indice_eficacia: number; // Indicador de eficacia
    responsable: string; // Responsable
  }

  export interface Actividades {
    descripcion: string; // Descripción de la actividad
    objetivos: Objetivos[]; // Lista de objetivos
  }
  
  export interface FactorRiesgoFisico {
    actividades: Actividades[]; // Lista de actividades
  }
  export interface FactorRiesgoQuimico {
    actividades: Actividades[]; // Lista de actividades
  }
  export interface FactorRiesgoBiologico {
    actividades: Actividades[]; // Lista de actividades
  }
  export interface PlanMedicionesHigiene {
    factor_riesgo_fisico: FactorRiesgoFisico; // Factor de riesgo físico
    factor_riesgo_quimico: FactorRiesgoQuimico; // Factor de riesgo químico
    factor_riesgo_biologico: FactorRiesgoBiologico; // Factor de riesgo biológico
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
    total_mediciones: number; // Total de mediciones
    total_recursos_economicos: number; // Total de recursos económicos
  }
  
  
  
  
  