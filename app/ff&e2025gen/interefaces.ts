export interface Comentarios {
  idComentario: number;
  comentario: string;
  fechaCreado: string;
  creadoPor: string;
}

export interface Task {
  idDestino: number;
  destino: string;
  idGrupo: number;
  grupo: string;
  idTarea: number;
  tarea: string;
  justificacion: string;
  estado: string;
  fechaAlta: string;
  fechaCaducidad: string;
  fechaSubsanacion: string;
  añoNatural: String;
  importePrevio: number;
  importeActual: number;
  idResponsable: number;
  campo1?: string; // campo1 puede ser string o null --- Num. CECO
  campo2?: string; // campo2 puede ser string o null --- Nombre del CECO
  campo3?: string; // campo3 puede ser string o null --- Tipología del proyecto
  campo4?: string; // campo4 puede ser string o null --- Ejecutor
  campo5?: string; // campo5 puede ser string o null --- Núm activo
  campo6?: string; // campo6 puede ser string o null --- NO. PEP
  campo7?: string; // campo7 puede ser string o null --- Importe aprobado
  campo8?: string; // campo8 puede ser string o null --- Importe definitivo
  campo9?: string; // campo9 puede ser string o null ---- NO. Proyecto
  campo10?: string; // campo10 puede ser string o null --- Responsable
  responsable: string;
  activo: number;
  comentariosTotal: number;
  comentarios: Comentarios[];
  adjuntos: string[];
  adjuntosTotal: number;
}

export interface TaskGroup {
  idGrupo: number;
  grupo: string;
  activo: number;
  idDestino: number;
  destino: string;
  ubicacion: string;
  tareasTotalPorcentaje: number;
  tareasTotal: number;
  finalizado: number;
  cotizacion: number;
  catalogoConceptos: number;
  aprobacion: number;
  pProveedor: number;
  ejecucion60: number;
  ejecucion80: number;
  tareas: Task[];
}
