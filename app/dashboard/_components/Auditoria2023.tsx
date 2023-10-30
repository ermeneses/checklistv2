"use client";
import Texto from "./Texto";
import useFetchData from "@/app/hooks/useFetchData";
import React from "react";
import Barra from "./Barra";
import { convertirFecha } from "@/utils/misFunciones";
type Props = {
  destino?: number;
  total?: number;
  finalizado?: number;
  proceso?: number;
  aprobacion?: number;
  proveedor?: number;
  fecha?: string;
};

type Data = {
  data: Proyecto[];
};

type Proyecto = {
  idGrupo: number;
  grupo: string;
  activo: number;
  idDestino: number;
  destino: string;
  ubicacion: string;
  tareasTotalPorcentaje: number;
  tareasTotal: number;
  tareasEnProceso: number;
  tareasPProveedor: number;
  tareasPAprovacion: number;
  tareasFinalizado: number;
  tareas: any[];
  data: any[];
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
    total += item.tareasTotal;
    finalizado += item.tareasFinalizado;
    proceso += item.tareasEnProceso;
    aprobacion += item.tareasPAprovacion;
    proveedor += item.tareasPProveedor;
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
  const url = "https://maphg.com/america/api_auditorias/";
  const body = {
    idDestino: destino,
    idUsuario: "2",
    apartado: "auditorias",
    accion: "all",
    palabra: "",
    estado: "",
  };

  const {
    data,
    isLoading,
    error,
  }: { data: Data | null; isLoading: boolean; error: any } = useFetchData(
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
    } = totales(data.data);

    totalT = totalTemp;
    finalizadoT = finalizadoTemp;
    procesoT = procesoTemp;
    aprobacionT = aprobacionTemp;
    proveedorT = proveedorTemp;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center flex-wrap gap-2">
          <Texto as="h5" className="font-[800]">
            2023
          </Texto>
          <Texto className="text-xs">{totalT} Tareas</Texto>
        </div>
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
      </div>
      <Barra
        total={totalT}
        finalizado={finalizadoT}
        proceso={procesoT}
        proveedor={proveedorT}
        aprobacion={aprobacionT}
        isLoading={isLoading}
      />
      <Texto className="text-xs">
        <strong>Recepción</strong>: {convertirFecha(fecha)}
      </Texto>
    </div>
  );
};

export default Auditoria2022;
