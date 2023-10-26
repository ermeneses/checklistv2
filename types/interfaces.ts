interface Destino {
  idDestino: number;
  destino: string;
  ubicacion: string;
  status: string;
  bandera: string;
  division: number;
  superficie: string;
  habitaciones: number;
}

interface Hotel {
  idHotel: number;
  idDestino: number;
  hotel: string;
  marca: string;
}

interface Checklist {
  idRegistro: string;
  destino: string;
  nombreDestino: string;
  hotel: string;
  sabana: string;
  equipo: string;
  creadoPor: string;
  fechaCreado: string;
  fechaFinalizado: string;
  actividad: string;
  idActividad: string;
  valor: string;
  comentario: string;
  adjunto: string;
  reportado: string;
  mes: string;
}

interface Actividad {
  idRegistro: string;
  destino: string;
  nombreDestino: string;
  hotel: string;
  sabana: string;
  equipo: string;
  creadoPor: string;
  fechaCreado: string;
  fechaFinalizado: string;
  actividad: string;
  idActividad: string;
  valor: string;
  comentario: string;
  adjunto: string;
  reportado: string;
  mes: string;
}

interface ActividadAgrupada {
  idRegistro: string;
  creadoPor: string;
  tiempo: number;
  creado: string;
  finalizado: string;
  hotel: string;
  actividades: Actividad[];
}

interface Resumen1 {
  Registros: number;
  Actividades: number;
  Valor: {
    NO: number;
    SI: number;
    "N/A": number;
  };
  Reportado: {
    NO: number;
    SI: number;
  };
}

interface Activity {
  idRegistro: string;
  destino: string;
  hotel: string;
  creadoPor: string;
  valor: string;
  reportado: string;
}

interface Summary {
  destino: string;
  actividadesPorDestino: {
    total: number;
    si: number;
    no: number;
    na: number;
    reportadasComoSi: number;
    reportadasComoNo: number;
    totalChecklist: number;
    idRegistros: Set<string>; // Agregado para realizar un seguimiento de los idRegistro únicos
  };
  hoteles: Array<{
    hotel: string;
    actividades: {
      total: number;
      si: number;
      no: number;
      na: number;
      reportadasComoSi: number;
      reportadasComoNo: number;
      totalChecklist: number;
      idRegistros: Set<string>; // Agregado para realizar un seguimiento de los idRegistro únicos
    };
  }>;
  tecnicos: Array<{
    tecnico: string;
    actividades: {
      total: number;
      si: number;
      no: number;
      na: number;
      reportadasComoSi: number;
      reportadasComoNo: number;
      totalChecklist: number;
      idRegistros: Set<string>; // Agregado para realizar un seguimiento de los idRegistro únicos
    };
  }>;
}

type HotelData = {
  idHotel: number;
  idDestino: number;
  hotel: string;
  marca: string;
};

type BodyChecklist = {
  inicio: string;
  fin: string;
  destino: string;
  hotel: string;
};

export type {
  BodyChecklist,
  Destino,
  Hotel,
  Checklist,
  Actividad,
  Resumen1,
  Activity,
  Summary,
  HotelData,
  ActividadAgrupada,
};
