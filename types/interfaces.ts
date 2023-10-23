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
    };
  }>;
}

type HotelData = {
  idHotel: number;
  idDestino: number;
  hotel: string;
  marca: string;
};

export type {
  Destino,
  Hotel,
  Checklist,
  Actividad,
  Resumen1,
  Activity,
  Summary,
  HotelData,
};
