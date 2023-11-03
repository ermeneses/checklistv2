"use client";
import Texto from "./Texto";
import useFetchData from "@/app/hooks/useFetchData";
import React from "react";
import Barra from "./Barra";
import { convertirFecha } from "@/utils/misFunciones";

type Props = {
  destino?: string;
  total?: number;
  finalizado?: number;
  proceso?: number;
  aprobacion?: number;
  proveedor?: number;
  fecha?: string;
};

type Proyecto = {
  idProyecto: number;
  seccion: string;
  proyecto: string;
  fase: string[];
  responsable: string;
  status: string;
  ots: number;
  finalizados: number;
  proceso: number;
  proveedor: number;
  pAprobar: number;
  avance: number;
  tareas: any[];
};

type Totales = {
  total: number;
  finalizado: number;
  proceso: number;
  aprobacion: number;
  proveedor: number;
};

const totales = (array: Proyecto[]): Totales => {
  let total = 0;
  let finalizado = 0;
  let proceso = 0;
  let aprobacion = 0;
  let proveedor = 0;

  array.forEach((item) => {
    total += item.ots;
    finalizado += item.finalizados;
    proceso += item.proceso;
    aprobacion += item.pAprobar;
    proveedor += item.proveedor;
  });

  return {
    total: total,
    finalizado: finalizado,
    proceso: proceso,
    aprobacion: aprobacion,
    proveedor: proveedor,
  };
};

const Auditoria2022 = ({
  destino,
  total,
  finalizado,
  proceso,
  aprobacion,
  proveedor,
  fecha = "15-05-2022",
}: Props) => {
  const url = "https://maphg.com/america/api_v3/";
  const body = {
    pagina: 1,
    idUsuario: 0,
    idDestino: 0,
    destino,
    apartado: "auditoriaProyectos",
    accion: "all",
    palabra: "",
    status: "TODO",
    fechaDe: "TODO",
    fechaInicio: "",
    fechaFin: "",
    zi: false,
    gp: false,
    trs: false,
    palabraClave: "auditoria",
  };

  const {
    data,
    isLoading,
    error,
  }: { data: Proyecto[] | null; isLoading: boolean; error: any } = useFetchData(
    url,
    body
  );

  let totalT = 0;
  let finalizadoT = 0;
  let procesoT = 0;
  let aprobacionT = 0;
  let proveedorT = 0;

  if (data) {
    const {
      aprobacion: aprobacionTemp,
      finalizado: finalizadoTemp,
      proveedor: proveedorTemp,
      proceso: procesoTemp,
      total: totalTemp,
    } = totales(data);

    totalT = totalTemp;
    finalizadoT = finalizadoTemp;
    procesoT = procesoTemp;
    aprobacionT = aprobacionTemp;
    proveedorT = proveedorTemp;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {isLoading ? (
          <div className="w-36 bg-slate-300 animate-pulse p-2 rounded-full"></div>
        ) : (
          <div className="flex items-center flex-wrap gap-2">
            <Texto className="font-[800] text-xl text-foreground/80">
              2022
            </Texto>
            <Texto className="text-sm font-[600]">{totalT} Tareas</Texto>
          </div>
        )}
        {isLoading ? (
          <div className="w-36 bg-slate-300 animate-pulse p-2 rounded-full"></div>
        ) : (
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {finalizadoT > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex-none w-2 h-2 rounded-full bg-green-500"></div>
                <h1>{((100 / totalT) * finalizadoT).toFixed(0)}% </h1>
              </div>
            )}
            {procesoT > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex-none w-2 h-2 rounded-full bg-yellow-500"></div>
                <h1>{((100 / totalT) * procesoT).toFixed(0)}%</h1>
              </div>
            )}
            {aprobacionT > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex-none w-2 h-2 rounded-full bg-blue-500"></div>
                <h1>{((100 / totalT) * aprobacionT).toFixed(0)}%</h1>
              </div>
            )}
            {proveedorT > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex-none w-2 h-2 rounded-full bg-red-500"></div>
                <h1>{((100 / totalT) * proveedorT).toFixed(0)}%</h1>
              </div>
            )}
          </div>
        )}
      </div>
      <Barra
        total={totalT}
        finalizado={finalizadoT}
        proceso={procesoT}
        proveedor={proveedorT}
        aprobacion={aprobacionT}
        isLoading={isLoading}
      />
      {isLoading ? (
        <div className="w-36 bg-slate-300 animate-pulse p-2 rounded-full"></div>
      ) : (
        <Texto className="text-sm font-[600]">
          Recepción: {convertirFecha(fecha)}
        </Texto>
      )}
    </div>
  );
};

export default Auditoria2022;
