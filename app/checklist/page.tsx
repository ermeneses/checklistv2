import type { Activity, Summary } from "@/types/interfaces";
import { Separator } from "@/components/ui/separator";
import { Encabezado } from "./_components/Encabezado";
import { Selectores } from "./_components/Selectores";
import Image from "next/image";

const Checklist = () => {
  return (
    <div className=" container gap-4 flex flex-col">
      <Encabezado />
      <Separator />
      <Selectores />
    </div>
  );
};

export default Checklist;
