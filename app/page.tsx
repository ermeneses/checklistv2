"use client";
import { AUDITORIAS } from "@/utils/misConstantes";
import Texto from "./dashboard/_components/Texto";
import Auditorias from "./dashboard/_components/Auditorias";

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
      <Texto as="h2" className="self-start">
        Auditorías PROPCO
      </Texto>
      <div className="flex items-center justify-start flex-wrap gap-2 w-full">
        <div className="text-xs rounded-full border border-green-500 bg-green-500/10 font-medium text-green-500 py-1 px-2">
          Finalizado
        </div>
        <div className="text-xs rounded-full border border-yellow-500 bg-yellow-500/10 font-medium text-yellow-500 py-1 px-2">
          En proceso
        </div>
        <div className="text-xs rounded-full border border-red-500 bg-red-500/10 font-medium text-red-500 py-1 px-2">
          Pte. Proveedor
        </div>
        <div className="text-xs rounded-full border border-blue-500 bg-blue-500/10 font-medium text-blue-500 py-1 px-2">
          Pte. Aprobación
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-12 w-full p-6">
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
