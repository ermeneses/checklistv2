import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Selects from "./_components/Selects";
import { useState } from "react";
import { CheckSquare } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-2xl font-[700] leading-none flex items-center gap-1">
          <CheckSquare size={16} className="text-foreground/50" /> CHECKLIST
        </h4>
        <p className="text-sm text-muted-foreground">
          Resumen de Checklist de llegadas
        </p>
      </div>
      <Separator className="my-4" />
      <Selects />
    </div>
  );
}
