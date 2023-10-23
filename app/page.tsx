"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Selects from "./_components/Selects";
import { useState, useEffect } from "react";
import { CheckSquare } from "lucide-react";
import Carta from "./_components/Carta";
import type { Resumen1 } from "@/types/interfaces";

export default function Home() {
  // <recibirDataDelHijo>
  const [dataFromChild, setDataFromChild] = useState<Resumen1 | null>(null);
  const handleDataFromChild = (data: Resumen1) => {
    setDataFromChild(data);
    console.log(data);
  };
  // </recibirDataDelHijo>

  return (
    <div className=" container space-y-5">
      <div className="gap-0 py-2 flex flex-col items-start justify-center">
        <h4 className="text-2xl font-[700] leading-none flex items-center gap-1">
          <CheckSquare size={16} className="text-foreground/50" /> CHECKLIST
        </h4>
        <p className="text-sm text-muted-foreground">
          Resumen de Checklist de llegadas
        </p>
      </div>
      <Separator />
      <Selects onData={handleDataFromChild} />
      {dataFromChild !== null ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Carta
            titulo="Total de Checklist"
            subtitulo="Registros totales"
            cantidad={dataFromChild.Registros}
            Icono="checklist"
          />
          <Carta
            titulo="Total de Actividades"
            subtitulo="Puntos de revisión"
            cantidad={dataFromChild.Actividades}
            Icono="actividades"
          />
          <Carta
            titulo="Marcadas como SÍ"
            subtitulo="Encontradas como OK"
            cantidad={dataFromChild.Valor.SI}
            Icono="si"
          />
          <Carta
            titulo="Marcadas como NO"
            subtitulo="Potenciales averías"
            cantidad={dataFromChild.Valor.NO}
            Icono="no"
          />
          <Carta
            titulo="Marcadas como N/A"
            subtitulo="No aplican"
            cantidad={dataFromChild.Valor["N/A"]}
            Icono="na"
          />
          <Carta
            titulo="Reportadas en GIFT"
            subtitulo="Anticipación"
            cantidad={dataFromChild.Reportado.SI}
            Icono="gift"
          />
        </div>
      ) : (
        "Noup"
      )}
    </div>
  );
}
