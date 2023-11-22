import Texto from "@/app/dashboard/_components/Texto";
import { convertirFechaMp } from "@/utils/misFunciones";
import { useEffect, useState } from "react";

interface Props {
  fechaI?: Date;
  fechaF?: Date;
  idDestino: number;
  nombreDestino: string;
}
type Actividad = {
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
};

type Data = {
  totalActividades: number;
  actividades: Actividad[];
};

const contarActividades = (data: Data) => {
  // Inicializar contadores
  let siCount = 0;
  let noCount = 0;
  let naCount = 0;
  let reportadoNoCount = 0;
  let reportadoSiCount = 0;
  let sepa = 0;
  let checklist = new Set<string>();

  // Recorrer las actividades
  data.actividades.forEach((actividad) => {
    // Contar actividades con propiedad "valor" igual a "SI", "NO" o "N/A"
    if (actividad.valor === "SI") {
      siCount++;
    } else if (actividad.valor === "NO") {
      noCount++;
    } else if (actividad.valor === "N/A") {
      naCount++;
    } else {
      sepa++;
      console.log(actividad.valor);
    }

    // Contar actividades con propiedad "reportado" igual a "NO"
    if (actividad.reportado === "NO") {
      reportadoNoCount++;
    } else if (actividad.reportado === "SI") {
      reportadoSiCount++;
    }
    checklist.add(actividad.idRegistro);
  });

  // Devolver objeto con las cantidades
  return {
    si: siCount,
    no: noCount,
    na: naCount,
    reportadoNo: reportadoNoCount,
    reportadoSi: reportadoSiCount,
    sepa,
    checklist: checklist.size,
  };
};
// LOS MESES ESTAN INDEXADOS POR ESO OCTUBRE EL 9 Y NO 10 YA QUE INICIAN DESDE EL 0
const Actividades = ({
  fechaI = new Date(2023, 9, 1),
  fechaF = new Date(2023, 9, 31),
  idDestino,
  nombreDestino,
}: Props) => {
  // STATES
  const [datos, setDatos] = useState<Data>();
  const [Loading, setLoading] = useState<boolean>(true);
  const [errores, setErrores] = useState<any>(null);
  // STATES

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://maphg.com/america/api_v3/", {
          method: "POST",
          body: JSON.stringify({
            idUsuario: 0,
            idDestino: idDestino.toString(),
            fechaInicio: convertirFechaMp(fechaI) + " 00:00:00",
            fechaFin: convertirFechaMp(fechaF) + " 23:59:59",
            apartado: "checkList",
            accion: "all2",
            idCheckList: "0",
            idHotel: 0,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        if (isMounted) {
          setDatos(jsonData.data);
          setLoading(false);
          // console.log(jsonData.data);
        }
      } catch (error) {
        if (isMounted) {
          setErrores(error);
          setLoading(false);
          console.log(error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fechaF, fechaI]);

  let resultados = {
    si: 0,
    no: 0,
    na: 0,
    reportadoNo: 0,
    reportadoSi: 0,
    sepa: 0,
    checklist: 0,
  };

  if (datos?.actividades) {
    resultados = contarActividades(datos);
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-2">
      <div className="flex md:flex-col gap-2">
        {Loading ? (
          <div className="w-36 p-2 rounded-full bg-slate-300 animate-pulse"></div>
        ) : (
          <Texto className="w-full md:w-72 text-xl md:text-3xl font-bold">
            {nombreDestino}
          </Texto>
        )}
      </div>
      {Loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3 md:gap-y-1">
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3 md:gap-y-1">
          <div>
            total checkList:{resultados.checklist} <br />
            si: {resultados.si}
            <br />
            no: {resultados.no}
            <br />
            na: {resultados.na}
            <br />
            reportado: {resultados.reportadoSi}
            <br />
            no reportado: {resultados.reportadoNo} <br />
            sepa: {resultados.sepa}
          </div>
        </div>
      )}
    </div>
  );
};

export default Actividades;
