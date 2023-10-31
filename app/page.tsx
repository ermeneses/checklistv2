"use client";
import { AUDITORIAS } from "@/utils/misConstantes";
import Texto from "./dashboard/_components/Texto";
import Auditorias from "./dashboard/_components/Auditorias";
import { Separator } from "@/components/ui/separator";

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

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex flex-col items-center justify-center w-full pb-9 pt-6">
        <Texto as="h2" className="font-[500] text-accent-foreground">
          Auditorías <span className="font-[700]">PROPCO</span>
        </Texto>
        <Texto className="text-muted-foreground leading-7">
          Resumen de avances auditorias PROPCO 2022 - 2023, mantenimiento
          América.
        </Texto>
        <div className="flex items-center flex-wrap gap-2 py-1 ">
          <div className="rounded-full bg-green-500 w-2 h-2 flex-none"></div>
          <Texto className="text-muted-foreground">Finalizado</Texto>
          <div className="rounded-full bg-yellow-500 w-2 h-2 flex-none"></div>
          <Texto className="text-muted-foreground">En proceso</Texto>
          <div className="rounded-full bg-red-500 w-2 h-2 flex-none"></div>
          <Texto className="text-muted-foreground">Pte. Proveedor</Texto>
          <div className="rounded-full bg-blue-500 w-2 h-2 flex-none"></div>
          <Texto className="text-muted-foreground">Pte. Aprobación</Texto>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 w-full px-6 pb-4">
        {AUDITORIAS.map((destino: Destino) => (
          <Auditorias
            key={destino.idDestino}
            idDestino={destino.idDestino}
            codDestino={destino.destino}
            fecha2022={destino.auditoria22}
            fecha2023={destino.auditoria23}
            ubicacion={destino.ubicacion}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
