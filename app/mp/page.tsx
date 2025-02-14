"use client";
import Texto from "../dashboard/_components/Texto";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import MP from "./_components/Mp";
import { MPMC } from "@/utils/misConstantes";

const Mp = () => {
  const [fechaInicial, setFechaInicial] = useState<Date>(new Date(2025, 0, 1));
  const [fechaFinal, setFechaFinal] = useState<Date>(new Date(2025, 0, 31));

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
          Mantenimiento <span className="font-[700]">PREVENTIVO</span>
        </Texto>
        <Texto className="text-muted-foreground leading-7">Porcentaje de cumplimiento de la planificación de MP</Texto>
        <Texto as="h4">ENERO 2025</Texto>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 w-full p-1 md:px-6 pb-4">
        {MPMC.map((d) => (
          <MP key={d.idDestino} fechaI={fechaInicial} fechaF={fechaFinal} idDestino={d.idDestino} nombreDestino={d.ubicacion} />
        ))}
      </div>
    </div>
  );
};

export default Mp;
