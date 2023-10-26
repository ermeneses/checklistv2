"use client";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Encabezado } from "./_components/Encabezado";
import { Selectores } from "./_components/Selectores";
import {
  Actividad,
  BodyChecklist,
  ActividadAgrupada,
  Summary,
} from "@/types/interfaces";
import { Loader, RefreshCcw, SearchX, Clock3 } from "lucide-react";
import {
  getChecklist,
  agruparActividades,
  resumenActividades,
  dashboard,
} from "@/utils/misFunciones";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Checklist = () => {
  const [body, setBody] = useState<BodyChecklist>();
  const [loading, setLoading] = useState<boolean>(false);
  const [sinRegistros, setSinRegistros] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<Actividad[]>([]);
  const [resumen, setResumen] = useState<Summary[]>([]);

  const padre = (data: BodyChecklist) => {
    setBody(data);
  };

  useEffect(() => {
    if (body) {
      setSinRegistros(false);
      setLoading(true);
      setChecklist([]);

      getChecklist(body)
        .then((respuesta: Actividad[]) => {
          if (respuesta && respuesta.length > 0) {
            setLoading(false);
            setChecklist(respuesta);
            const genRes = dashboard(respuesta);
            console.log(genRes);

            setResumen(genRes);
          } else {
            setLoading(false);
            setSinRegistros(true);
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          setLoading(false);
        });
    }
  }, [body]);

  return (
    <div className=" container gap-4 flex flex-col">
      <Encabezado />
      <Separator />
      <Selectores hijo={padre} loading={loading} />
      {sinRegistros && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground py-24">
          <SearchX size={44} className="animate-pulse" />
          <h1>Sin Resultados, intente con otros filtros de búsqueda</h1>
        </div>
      )}
      {checklist.length > 0 && (
        <Tabs defaultValue="Dashboard" className="w-auto">
          <TabsList>
            <TabsTrigger value="Dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="Checklist">Checklist</TabsTrigger>
          </TabsList>
          <TabsContent value="Dashboard">
            {resumen.map((db) => (
              <Card className="p-2" key={db.destino}>
                <CardHeader>
                  <CardTitle>{db.destino}</CardTitle>
                  <CardDescription>COMPLEJO</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  <Card className="flex flex-col items-center justify-center py-4 px-3">
                    <h1 className="text-4xl font-bold">
                      {db.actividadesPorDestino.totalChecklist}
                    </h1>
                    <h2 className="font-semibold text-xs uppercase">
                      Total de Checklist
                    </h2>
                    <h3 className="text-muted-foreground text-xs">
                      Registros totales
                    </h3>
                  </Card>
                  <Card className="flex flex-col items-center justify-center py-4 px-3">
                    <h1 className="text-4xl font-bold">
                      {db.actividadesPorDestino.total}
                    </h1>
                    <h2 className="font-semibold text-xs uppercase">
                      Total de Actividades
                    </h2>
                    <h3 className="text-muted-foreground text-xs">
                      Puntos de revisión
                    </h3>
                  </Card>
                  <Card className="flex flex-col items-center justify-center py-4 px-3">
                    <h1 className="text-4xl font-bold">
                      {db.actividadesPorDestino.si}
                    </h1>
                    <h2 className="font-semibold text-xs uppercase">
                      Marcadas como SÍ
                    </h2>
                    <h3 className="text-muted-foreground text-xs">
                      Encontradas como OK
                    </h3>
                  </Card>
                  <Card className="flex flex-col items-center justify-center py-4 px-3">
                    <h1 className="text-4xl font-bold">
                      {db.actividadesPorDestino.no}
                    </h1>
                    <h2 className="font-semibold text-xs uppercase">
                      Marcadas como NO
                    </h2>
                    <h3 className="text-muted-foreground text-xs">
                      Potenciales averías
                    </h3>
                  </Card>
                  <Card className="flex flex-col items-center justify-center py-4 px-3">
                    <h1 className="text-4xl font-bold">
                      {db.actividadesPorDestino.na}
                    </h1>
                    <h2 className="font-semibold text-xs uppercase">
                      Marcadas como N/A
                    </h2>
                    <h3 className="text-muted-foreground text-xs">
                      No aplican
                    </h3>
                  </Card>
                  <Card className="flex flex-col items-center justify-center py-4 px-3">
                    <h1 className="text-4xl font-bold">
                      {db.actividadesPorDestino.reportadasComoSi}
                    </h1>
                    <h2 className="font-semibold text-xs uppercase">
                      Reportado en GIFT
                    </h2>
                    <h3 className="text-muted-foreground text-xs">
                      Anticipación
                    </h3>
                  </Card>
                </CardContent>
                <CardContent>
                  <div className="w-full bg-indigo-200 p-2 flex items-center justify-between">
                    <div className="p-1 bg-pink-200 w-1/2 h-full"></div>
                    <div className="p-1 bg-teal-200 w-1/2 h-full">
                      {db.tecnicos.map((tecnico) => (
                        <h1 className="uppercase" key={tecnico.tecnico}>
                          {tecnico.tecnico}{" "}
                        </h1>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent
            value="Checklist"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {agruparActividades(checklist).map((checklist) => (
              <Card key={checklist.idRegistro}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{checklist.creadoPor}</CardTitle>
                    <Badge variant={"outline"} className="gap-1">
                      <Clock3 size={12} />
                      {checklist.tiempo.toFixed(1)}
                      <span>min</span>
                    </Badge>
                  </div>
                  <CardDescription className="flex flex-col items-start justify-center text-xs gap-0">
                    <span>Creado:{checklist.creado.substring(10)}</span>
                    <span>Finalizado:{checklist.finalizado.substring(10)}</span>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between">
                  <span className="text-xs">
                    {checklist.finalizado.slice(0, 10)}
                  </span>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button size={"sm"}>Actividades</Button>
                    </SheetTrigger>
                    <SheetContent className="min-w-fit overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2 justify-start">
                          {checklist.creadoPor}
                          <Badge variant={"outline"} className="gap-1">
                            <Clock3 size={12} />
                            {checklist.tiempo.toFixed(1)}
                            <span>min</span>
                          </Badge>
                        </SheetTitle>
                        <SheetDescription className="flex flex-col text-xs ">
                          <span>Fecha de creación: {checklist.creado}</span>
                          <span>
                            Fecha de finalización: {checklist.finalizado}
                          </span>
                          <span className="mt-1 font-semibold">
                            {checklist.hotel}
                          </span>
                        </SheetDescription>
                      </SheetHeader>
                      <Table className="text-xs">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Reportado?</TableHead>
                            <TableHead>Actividad</TableHead>
                            <TableHead>Comentario</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {checklist.actividades.map((act) => (
                            <TableRow key={act.idActividad}>
                              <TableCell className="text-center">
                                {act.valor}
                              </TableCell>
                              <TableCell className="text-center">
                                {act.reportado}
                              </TableCell>
                              <TableCell className="lowercase first-letter:uppercase">
                                {act.actividad}
                              </TableCell>
                              <TableCell>{act.comentario}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Checklist;
