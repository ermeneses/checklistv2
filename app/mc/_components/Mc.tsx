import Texto from "@/app/dashboard/_components/Texto";
import { forwardRef, useImperativeHandle } from "react";
import useFetchData from "@/app/hooks/useFetchData";
import { convertirFechaMp } from "@/utils/misFunciones";
import Barra from "./Barra";

interface Props {
  fechaI?: Date;
  fechaF?: Date;
  idDestino: number;
  nombreDestino: string;
}
type Seccion = {
  idSeccion: 1;
  seccion: string;
  creados: number;
  pendientes: number;
  solucionados: number;
  fechaInicio: string;
  fechaFin: string;
  incidencias: [];
};
type Data = {
  secciones: Seccion[];
  global: {
    creadosGlobales: number;
    solucionadosGlobales: number;
    pendientesGlobales: number;
    acumuladoGlobales: number;
    mediaHoras: number;
    ratioCredas: number;
    ratioFinalizadas: number;
  };
};

const Mp = ({
  fechaI = new Date(2023, 9, 1),
  fechaF = new Date(2023, 9, 31),
  idDestino,
  nombreDestino,
}: Props) => {
  // console.log(convertirFechaMp(fechaI));

  const url = "https://maphg.com/america/api_v3/";
  const body = {
    idUsuario: 0,
    idDestino: idDestino.toString(),
    fechaInicio: convertirFechaMp(fechaI),
    fechaFin: convertirFechaMp(fechaF),
    apartado: "ReporteRanking",
    accion: "incidenciasSecciones",
  };

  const {
    data,
    isLoading,
    error,
  }: { data: Data | null; isLoading: boolean; error: any } = useFetchData(
    url,
    body
  );

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-2">
      <div className="flex md:flex-col gap-2">
        {isLoading ? (
          <div className="w-36 p-2 rounded-full bg-slate-300 animate-pulse"></div>
        ) : (
          <Texto className="w-full md:w-72 text-xl md:text-3xl font-bold">
            {nombreDestino}
          </Texto>
        )}
        {data?.global && (
          <Barra
            planificado={data.global.creadosGlobales}
            finalizado={data.global.solucionadosGlobales}
          />
        )}
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3 md:gap-y-1">
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-6 bg-slate-300 animate-pulse p-1 rounded-full"></div>
            <div className="w-36 bg-slate-300 animate-pulse p-1 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3 md:gap-y-1">
          {data?.secciones.map((seccion) => (
            <Barra
              seccion={seccion.seccion}
              key={seccion.idSeccion}
              planificado={seccion.creados}
              finalizado={seccion.solucionados}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Mp;