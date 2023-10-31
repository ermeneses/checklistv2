import React from "react";
type Props = {
  total?: number;
  finalizado?: number;
  proceso?: number;
  aprobacion?: number;
  proveedor?: number;
  isLoading?: boolean;
};
const Barra = ({
  total = 0,
  finalizado = 0,
  proceso = 0,
  aprobacion = 0,
  proveedor = 0,
  isLoading,
}: Props) => {
  const porcentajes = {
    finalizado: ((100 / total) * finalizado).toFixed(0),
    proceso: ((100 / total) * proceso).toFixed(0),
    aprobacion: ((100 / total) * aprobacion).toFixed(0),
    proveedor: ((100 / total) * proveedor).toFixed(0),
  };
  return (
    <div
      className={
        isLoading
          ? " bg-foreground/50 animate-pulse rounded-full flex items-center p-0.5"
          : " bg-foreground/5 rounded-full flex items-center p-0.5"
      }
    >
      {finalizado > 0 ? (
        <div
          style={{ width: `${porcentajes.finalizado}%` }}
          className="bg-green-500 dark:bg-opacity-80 p-1.5 rounded-full"
        ></div>
      ) : null}
      {proceso > 0 ? (
        <div
          style={{ width: `${porcentajes.proceso}%` }}
          className="bg-yellow-500 dark:bg-opacity-80 p-1.5 rounded-full"
        ></div>
      ) : null}
      {aprobacion > 0 ? (
        <div
          style={{ width: `${porcentajes.aprobacion}%` }}
          className="bg-blue-500 dark:bg-opacity-80 p-1.5 rounded-full"
        ></div>
      ) : null}
      {proveedor > 0 ? (
        <div
          style={{ width: `${porcentajes.proveedor}%` }}
          className="bg-red-500 dark:bg-opacity-80 p-1.5 rounded-full"
        ></div>
      ) : null}
    </div>
  );
};

export default Barra;
