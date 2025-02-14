// "use client";
// import Texto from "../dashboard/_components/Texto";
// import { Separator } from "@/components/ui/separator";
// import { useState } from "react";
// import MC from "./_components/Mc";
// import { MPMC } from "@/utils/misConstantes";

// const Mp = () => {
//   const [fechaInicial, setFechaInicial] = useState<Date>(new Date(2025, 0, 1));
//   const [fechaFinal, setFechaFinal] = useState<Date>(new Date(2025, 0, 31));

//   const cFechaInicial = (fecha: Date) => {
//     setFechaInicial(fecha);
//   };
//   const cFechaFinal = (fecha: Date) => {
//     setFechaFinal(fecha);
//   };

//   return (
//     <div className="flex flex-col items-center gap-6 w-full">
//       <div className="flex flex-col items-center justify-center w-full gap-2 h-44  text-center">
//         <Texto as="h2" className="font-[500] text-accent-foreground">
//           Mantenimiento <span className="font-[700]">CORRECTIVO</span>
//         </Texto>
//         <Texto className="text-muted-foreground leading-7">Ordenes de trabajo mantenimiento correctivo creadas vs finalizadas</Texto>

//         <Texto as="h4">ENERO 2025</Texto>

//       </div>
//       <Separator />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 w-full p-1 md:px-6 pb-4">
//         {MPMC.map((d) => (
//           <MC key={d.idDestino} fechaI={fechaInicial} fechaF={fechaFinal} idDestino={d.idDestino} nombreDestino={d.ubicacion} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Mp;

"use client";
import Texto from "../dashboard/_components/Texto";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import MC from "./_components/Mc";
import { MPMC } from "@/utils/misConstantes";

const Mp = () => {
  // Estados definitivos para las fechas que se pasan a MP
  const [fechaInicial, setFechaInicial] = useState<Date>(new Date(2025, 0, 1));
  const [fechaFinal, setFechaFinal] = useState<Date>(new Date(2025, 0, 31));

  // Estados temporales para los inputs de fecha
  const [tempFechaInicial, setTempFechaInicial] = useState<string>(fechaInicial.toISOString().split("T")[0]);
  const [tempFechaFinal, setTempFechaFinal] = useState<string>(fechaFinal.toISOString().split("T")[0]);

  const actualizarFechas = () => {
    // Convertir los strings a objetos Date y actualizar el estado definitivo
    const nuevaFechaInicial = new Date(tempFechaInicial);
    const nuevaFechaFinal = new Date(tempFechaFinal);
    setFechaInicial(nuevaFechaInicial);
    setFechaFinal(nuevaFechaFinal);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex flex-col items-center justify-center w-full gap-2 h-44 text-center">
        <Texto as="h2" className="font-[500] text-accent-foreground">
          Mantenimiento <span className="font-[700]">CORRECTIVO</span>
        </Texto>
        <Texto className="text-muted-foreground leading-7">Porcentaje de cumplimiento de la planificación de MP</Texto>
        <Texto as="h4">ENERO 2025</Texto>
      </div>

      {/* Campos para seleccionar fechas y botón para actualizar */}
      <div className="flex flex-col md:flex-row items-end gap-4">
        <div className="flex flex-col">
          <label htmlFor="fechaInicial">Fecha Inicial</label>
          <input id="fechaInicial" type="date" value={tempFechaInicial} onChange={(e) => setTempFechaInicial(e.target.value)} className="border rounded p-1" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fechaFinal">Fecha Final</label>
          <input id="fechaFinal" type="date" value={tempFechaFinal} onChange={(e) => setTempFechaFinal(e.target.value)} className="border rounded p-1" />
        </div>
        <button onClick={actualizarFechas} className="bg-blue-500 text-white p-2 rounded">
          Actualizar fechas
        </button>
      </div>

      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 w-full p-1 md:px-6 pb-4">
        {MPMC.map((d) => (
          // Se agrega un key que depende de idDestino y de las fechas (en milisegundos)
          <MC key={`${d.idDestino}-${fechaInicial.getTime()}-${fechaFinal.getTime()}`} fechaI={fechaInicial} fechaF={fechaFinal} idDestino={d.idDestino} nombreDestino={d.ubicacion} />
        ))}
      </div>
    </div>
  );
};

export default Mp;
