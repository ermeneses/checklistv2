function generarResumenActividades(actividades: Activity[]): Summary[] {
  const resumen: Summary[] = [];

  actividades.forEach((actividad) => {
    // Buscar el destino en el resumen
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
        },
        hoteles: [],
        tecnicos: [],
      };
      resumen.push(destino);
    }

    // Actualizar las actividades por destino
    destino.actividadesPorDestino.total++;
    if (actividad.valor === "SI") destino.actividadesPorDestino.si++;
    if (actividad.valor === "NO") destino.actividadesPorDestino.no++;
    if (actividad.valor === "N/A") destino.actividadesPorDestino.na++;
    if (actividad.reportado === "SI")
      destino.actividadesPorDestino.reportadasComoSi++;
    if (actividad.reportado === "NO")
      destino.actividadesPorDestino.reportadasComoNo++;

    // Buscar el hotel en el destino
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
        },
      };
      destino.hoteles.push(hotel);
    }

    // Actualizar las actividades por hotel
    hotel.actividades.total++;
    if (actividad.valor === "SI") hotel.actividades.si++;
    if (actividad.valor === "NO") hotel.actividades.no++;
    if (actividad.valor === "N/A") hotel.actividades.na++;
    if (actividad.reportado === "SI") hotel.actividades.reportadasComoSi++;
    if (actividad.reportado === "NO") hotel.actividades.reportadasComoNo++;

    // Buscar el técnico en el destino
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
        },
      };
      destino.tecnicos.push(tecnico);
    }

    // Actualizar las actividades por técnico
    tecnico.actividades.total++;
    if (actividad.valor === "SI") tecnico.actividades.si++;
    if (actividad.valor === "NO") tecnico.actividades.no++;
    if (actividad.valor === "N/A") tecnico.actividades.na++;
    if (actividad.reportado === "SI") tecnico.actividades.reportadasComoSi++;
    if (actividad.reportado === "NO") tecnico.actividades.reportadasComoNo++;
  });

  return resumen;
}

// Ejemplo de uso con tu array de objetos
const actividades = [
  {
    idRegistro: "lnyz2u10lnyz2u11",
    destino: "NYC",
    nombreDestino: "45 Times Square",
    hotel: "NY",
    sabana: "Rooms Checklist",
    equipo: "Habitación - 302\r\n",
    creadoPor: "Eduardo Meneses",
    fechaCreado: "2023-10-20 01:56:48",
    fechaFinalizado: "2023-10-20 01:57:16",
    actividad: "THE DOOR BATTERY DIAGNOSIS WAS OK?",
    idActividad: "lnyz2u9mlnyz2u9n",
    valor: "SI",
    comentario: "",
    adjunto: "",
    reportado: "NO",
    mes: "OCTUBRE",
  },
  {
    idRegistro: "lnyz2u10lnyz2u11",
    destino: "NYC",
    nombreDestino: "45 Times Square",
    hotel: "NY",
    sabana: "Rooms Checklist",
    equipo: "Habitación - 302\r\n",
    creadoPor: "Eduardo Meneses",
    fechaCreado: "2023-10-20 01:56:48",
    fechaFinalizado: "2023-10-20 01:57:16",
    actividad: "IS THE CARD READER WORKING CORRECTLY?",
    idActividad: "lnyz2u9plnyz2u9q",
    valor: "SI",
    comentario: "",
    adjunto: "",
    reportado: "NO",
    mes: "OCTUBRE",
  },
  // ... Aquí puedes agregar más objetos si es necesario
];

const resumenActividades = generarResumenActividades(actividades);
console.log(resumenActividades);
