import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Selects from "./_components/Selects";
import { useState } from "react";
import { CheckSquare } from "lucide-react";
import Carta from "./_components/Carta";

export default function Home() {
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
      <Selects />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Carta
          titulo="Total de Checklist"
          subtitulo="Registros totales"
          cantidad="3"
          Icono="checklist"
        />
        <Carta
          titulo="Total de Actividades"
          subtitulo="Puntos de revisión"
          cantidad="3"
          Icono="actividades"
        />
        <Carta
          titulo="Marcadas como SÍ"
          subtitulo="Encontradas como OK"
          cantidad="3"
          Icono="si"
        />
        <Carta
          titulo="Marcadas como NO"
          subtitulo="Potenciales averías"
          cantidad="3"
          Icono="no"
        />
        <Carta
          titulo="Marcadas como N/A"
          subtitulo="Actividades que no aplicaban"
          cantidad="3"
          Icono="na"
        />
        <Carta
          titulo="Reportadas en GIFT"
          subtitulo="Anticipación"
          cantidad="3"
          Icono="gift"
        />
      </div>
    </div>
  );
}
