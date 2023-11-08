import React from "react";

interface Props {
  seccion?: string;
  planificado: number;
  finalizado: number;
}

const Barra = ({ planificado, finalizado, seccion }: Props) => {
  // Comprobación de valores para evitar NaN
  const planificadoValue = planificado || 1;
  const finalizadoValue = finalizado || 0;

  const porcentajes = {
    finalizado:
      (100 / planificadoValue) * finalizadoValue > 100
        ? 100
        : (100 / planificadoValue) * finalizadoValue,
    programado: (100 / planificadoValue) * planificadoValue,
  };

  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <div className="flex items-center justify-start gap-2">
        {seccion && <h1 className="text-xs w-6 font-bold">{seccion}</h1>}
        <h1 className="text-xs w-6">{porcentajes.finalizado.toFixed(0)}%</h1>
      </div>
      <div className="w-24 rounded-full bg-blue-500/20 flex items-center justify-start flex-none">
        <div
          style={{ width: `${porcentajes.finalizado}%` }}
          className="p-1 rounded-full bg-green-500"
        ></div>
      </div>
    </div>
  );
};

export default Barra;
