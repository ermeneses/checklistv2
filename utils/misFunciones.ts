import {
  Activity,
  Summary,
  BodyChecklist,
  Actividad,
  ActividadAgrupada,
  Hotel,
} from "@/types/interfaces";

// import { format, formatDistanceToNow } from "date-fns";
// import { es } from "date-fns/locale";

// ************************************************************************************************
export const getChecklist = async (
  body: BodyChecklist
): Promise<Actividad[]> => {
  try {
    const response = await fetch("https://maphg.com/america/api_v3/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido
      },
      body: JSON.stringify({
        apartado: "checkList",
        accion: "all2",
        idUsuario: "1",
        idCheckList: "0",
        fechaInicio: body.inicio,
        fechaFin: body.fin,
        idDestino: body.destino,
        idHotel: body.hotel,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    const respuesta = data.data.actividades;
    return respuesta; // Asegúrate de devolver la respuesta en el formato correcto
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // Puedes elegir manejar el error aquí o lanzarlo para manejarlo en el componente
  }
};

// ************************************************************************************************
export function dashboard(actividades: Actividad[]): Summary[] {
  const resumen: Summary[] = [];

  actividades.forEach((actividad) => {
    let destino = resumen.find((item) => item.destino === actividad.destino);
    if (!destino) {
      destino = {
        destino: actividad.destino,
        actividadesPorDestino: {
          total: 0,
          si: 0,
          no: 0,
          na: 0,
          reportadasComoSi: 0,
          reportadasComoNo: 0,
          totalChecklist: 0,
          idRegistros: new Set<string>(),
        },
        hoteles: [],
        tecnicos: [],
      };
      resumen.push(destino);
    }

    destino.actividadesPorDestino.total++;
    if (actividad.valor === "SI") destino.actividadesPorDestino.si++;
    if (actividad.valor === "NO") destino.actividadesPorDestino.no++;
    if (actividad.valor === "N/A") destino.actividadesPorDestino.na++;
    if (actividad.reportado === "SI")
      destino.actividadesPorDestino.reportadasComoSi++;
    if (actividad.reportado === "NO")
      destino.actividadesPorDestino.reportadasComoNo++;

    let hotel = destino.hoteles.find((item) => item.hotel === actividad.hotel);
    if (!hotel) {
      hotel = {
        hotel: actividad.hotel,
        actividades: {
          total: 0,
          si: 0,
          no: 0,
          na: 0,
          reportadasComoSi: 0,
          reportadasComoNo: 0,
          totalChecklist: 0,
          idRegistros: new Set<string>(),
        },
      };
      destino.hoteles.push(hotel);
    }

    hotel.actividades.total++;
    if (actividad.valor === "SI") hotel.actividades.si++;
    if (actividad.valor === "NO") hotel.actividades.no++;
    if (actividad.valor === "N/A") hotel.actividades.na++;
    if (actividad.reportado === "SI") hotel.actividades.reportadasComoSi++;
    if (actividad.reportado === "NO") hotel.actividades.reportadasComoNo++;

    hotel.actividades.idRegistros.add(actividad.idRegistro);
    hotel.actividades.totalChecklist = hotel.actividades.idRegistros.size;
    destino.actividadesPorDestino.idRegistros.add(actividad.idRegistro);

    let tecnico = destino.tecnicos.find(
      (item) => item.tecnico === actividad.creadoPor
    );
    if (!tecnico) {
      tecnico = {
        tecnico: actividad.creadoPor,
        actividades: {
          total: 0,
          si: 0,
          no: 0,
          na: 0,
          reportadasComoSi: 0,
          reportadasComoNo: 0,
          totalChecklist: 0,
          idRegistros: new Set<string>(), // Ajustar según el tipo de idRegistro
        },
      };
      destino.tecnicos.push(tecnico);
    }

    tecnico.actividades.total++;
    if (actividad.valor === "SI") tecnico.actividades.si++;
    if (actividad.valor === "NO") tecnico.actividades.no++;
    if (actividad.valor === "N/A") tecnico.actividades.na++;
    if (actividad.reportado === "SI") tecnico.actividades.reportadasComoSi++;
    if (actividad.reportado === "NO") tecnico.actividades.reportadasComoNo++;

    tecnico.actividades.idRegistros.add(actividad.idRegistro);
    tecnico.actividades.totalChecklist = tecnico.actividades.idRegistros.size;

    destino.actividadesPorDestino.totalChecklist =
      destino.actividadesPorDestino.idRegistros.size;

    // Lógica para los técnicos si corresponde
  });

  return resumen;
}

// *******************************************************************************************

export const agruparActividades = (
  actividades: Actividad[]
): ActividadAgrupada[] => {
  return actividades.reduce(
    (resultado: ActividadAgrupada[], actividad: Actividad) => {
      const existente = resultado.find(
        (item) => item.idRegistro === actividad.idRegistro
      );

      if (existente) {
        existente.actividades.push(actividad);
      } else {
        const tiempoDiferencia: number =
          Math.abs(
            new Date(actividad.fechaFinalizado).getTime() -
              new Date(actividad.fechaCreado).getTime()
          ) /
          (1000 * 60); // Convertir a minutos

        resultado.push({
          idRegistro: actividad.idRegistro,
          creadoPor: actividad.creadoPor,
          tiempo: tiempoDiferencia,
          creado: actividad.fechaCreado,
          finalizado: actividad.fechaFinalizado,
          hotel: actividad.hotel,
          actividades: [actividad],
        });
      }
      return resultado;
    },
    []
  );
};

// *******************************************************

export const resumenActividades = (actividades: Actividad[]): any[] => {
  return actividades.reduce(
    (resumen: any[], actividad: Actividad) => {
      resumen[0].valor[actividad.valor.toLowerCase()]++;
      resumen[0].reportado[actividad.reportado.toLowerCase()]++;
      if (actividad.adjunto !== "") resumen[0].adjunto = true;
      return resumen;
    },
    [
      {
        valor: { si: 0, no: 0, na: 0 },
        reportado: { si: 0, no: 0 },
        adjunto: false,
      },
    ]
  );
};

// *******************************************************

// export const convertirFecha = (fechaString: string): string => {
//   const fecha = new Date(fechaString);
//   const fechaFormateada = format(fecha, "dd MMMM", { locale: es });
//   const hoy = new Date();
//   const milisegundosPorDia = 1000 * 60 * 60 * 24;
//   const diferenciaMilisegundos = hoy.getTime() - fecha.getTime();
//   const diferenciaDias = Math.floor(
//     diferenciaMilisegundos / milisegundosPorDia
//   );

//   let texto = "";

//   if (diferenciaDias < 30) {
//     const textoDias = diferenciaDias === 1 ? "día" : "días";
//     texto = `${fechaFormateada.toUpperCase()}, hace ${diferenciaDias} ${textoDias}`;
//   } else {
//     const diferenciaMeses = Math.floor(diferenciaDias / 30);
//     const restoDias = diferenciaDias % 30;
//     const textoMeses = diferenciaMeses === 1 ? "mes" : "meses";
//     const textoDias = restoDias === 1 ? "día" : "días";
//     if (restoDias > 0) {
//       texto = `${fechaFormateada.toUpperCase()}, hace ${diferenciaMeses} ${textoMeses} y ${restoDias} ${textoDias}`;
//     } else {
//       texto = `${fechaFormateada.toUpperCase()}, hace ${diferenciaMeses} ${textoMeses}`;
//     }
//   }

//   return texto;
// };

const meses: string[] = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export const convertirFecha = (fechaString: string): string => {
  const fechaArray: string[] = fechaString.split("-");
  const fecha: Date = new Date(
    `${fechaArray[2]}-${fechaArray[0]}-${fechaArray[1]}T00:00:00`
  );
  const fechaFormateada: string = `${fecha.getDate()} ${
    meses[fecha.getMonth()]
  }`;
  const hoy: Date = new Date();
  const milisegundosPorDia: number = 1000 * 60 * 60 * 24;
  const diferenciaMilisegundos: number = hoy.getTime() - fecha.getTime();
  const diferenciaDias: number = Math.floor(
    diferenciaMilisegundos / milisegundosPorDia
  );

  let texto: string = "";

  if (diferenciaDias < 30) {
    const textoDias: string = diferenciaDias === 1 ? "día" : "días";
    texto = `${fechaFormateada}, hace ${diferenciaDias} ${textoDias}`;
  } else {
    const diferenciaMeses: number = Math.floor(diferenciaDias / 30);
    const restoDias: number = diferenciaDias % 30;
    const textoMeses: string = diferenciaMeses === 1 ? "mes" : "meses";
    const textoDias: string = restoDias === 1 ? "día" : "días";
    if (restoDias > 0) {
      texto = `${fechaFormateada}, hace ${diferenciaMeses} ${textoMeses} y ${restoDias} ${textoDias}`;
    } else {
      texto = `${fechaFormateada}, hace ${diferenciaMeses} ${textoMeses}`;
    }
  }

  return texto;
};

export const convertirFechaMp = (fechaString: Date): string => {
  const fecha = new Date(fechaString);
  const year = fecha.getFullYear();
  const month = ("0" + (fecha.getMonth() + 1)).slice(-2);
  const day = ("0" + fecha.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
