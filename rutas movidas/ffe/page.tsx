"use client";
import Texto from "../dashboard/_components/Texto";
import { Separator } from "@/components/ui/separator";
import MP from "./_components/Mp";
import { FFE } from "@/utils/misConstantes";

const Mp = () => {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex flex-col items-center justify-center w-full gap-2 h-44  text-center">
        <Texto as="h2" className="font-[500] text-accent-foreground">
          Avance <span className="font-[700]">FF&E</span>
        </Texto>
        <Texto className="text-muted-foreground leading-7">
          Avance de proyectos FF&E de mantenimiento 2022 y 2023
        </Texto>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 w-full p-1 md:px-6 pb-4">
        {FFE.map((d) => (
          <MP
            key={d.idDestino}
            nombreDestino={d.ubicacion}
            avance2022={d.ffe2022}
            avance2023={d.ffe2023}
          />
        ))}
      </div>
    </div>
  );
};

export default Mp;
