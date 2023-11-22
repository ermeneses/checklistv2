import { CheckSquare } from "lucide-react";

export const Encabezado = () => {
  return (
    <div className="gap-0 flex flex-col items-start justify-center pt-2">
      <h4 className="text-2xl font-[700] leading-none flex items-center gap-1">
        <CheckSquare size={25} className="text-foreground/50" /> CHECKLIST
      </h4>
      <p className="text-sm text-muted-foreground">
        Resumen de Checklist de llegadas
      </p>
    </div>
  );
};
