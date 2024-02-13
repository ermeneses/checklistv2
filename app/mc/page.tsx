"use client";
import Texto from "../dashboard/_components/Texto";
import Auditorias from "../dashboard/_components/Auditorias";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { DatePicker } from "./_components/DatePicker";
import MC from "./_components/Mc";
import { FormLabel } from "@/components/ui/form";
import { MPMC } from "@/utils/misConstantes";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface Destino {
  idDestino: number;
  destino: string;
  ubicacion: string;
  status: string;
  bandera: string;
  division: number;
  superficie: string;
  habitaciones: number;
  auditoria22: string;
  auditoria23: string;
}

const Mp = () => {
  const [fechaInicial, setFechaInicial] = useState<Date>(new Date(2024, 0, 1));
  const [fechaFinal, setFechaFinal] = useState<Date>(new Date(2024, 0, 31));

  const cFechaInicial = (fecha: Date) => {
    setFechaInicial(fecha);
  };
  const cFechaFinal = (fecha: Date) => {
    setFechaFinal(fecha);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex flex-col items-center justify-center w-full gap-2 h-44  text-center">
        <Texto as="h2" className="font-[500] text-accent-foreground">
          Mantenimiento <span className="font-[700]">CORRECTIVO</span>
        </Texto>
        <Texto className="text-muted-foreground leading-7">
          Ordenes de trabajo mantenimiento correctivo creadas vs finalizadas
        </Texto>
        {/* <div className="flex items-center gap-3 px-3 pt-7">
          <DatePicker onFechaChange={cFechaInicial} label="Fecha Inicial" />
          <DatePicker onFechaChange={cFechaFinal} label="Fecha Final" />
        </div> */}
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 w-full p-1 md:px-6 pb-4">
        {MPMC.map((d) => (
          <MC
            key={d.idDestino}
            fechaI={fechaInicial}
            fechaF={fechaFinal}
            idDestino={d.idDestino}
            nombreDestino={d.ubicacion}
          />
        ))}
      </div>
    </div>
  );
};

export default Mp;
