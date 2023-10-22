import React from "react";
import {
  Activity,
  ListTodo,
  ListChecks,
  CheckSquare,
  XSquare,
  MinusSquare,
  Flag,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Iconos {
  [key: string]: any;
}

const iconos: Iconos = {
  si: CheckSquare,
  no: XSquare,
  na: MinusSquare,
  gift: Flag,
  activity: Activity,
  checklist: ClipboardCheck,
  actividades: ListChecks,
  // Agrega otros iconos aquí
};

interface Props {
  Icono?: string;
  titulo: string;
  subtitulo: string;
  cantidad: string;
}

const Carta = ({
  Icono = "activity",
  titulo = "Titulo",
  subtitulo = "subtitulo",
  cantidad = "cantidad",
}: Props) => {
  const IconoElegido = iconos[Icono] || null;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{titulo}</CardTitle>
        {IconoElegido && (
          <IconoElegido className="text-foreground/50" size={18} />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cantidad}</div>
        <p className="text-xs text-muted-foreground">{subtitulo}</p>
      </CardContent>
    </Card>
  );
};

export default Carta;
