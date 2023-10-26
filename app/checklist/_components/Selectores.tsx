"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Globe, RefreshCcw, AlertTriangle, Hotel } from "lucide-react";
import type { HotelData } from "@/types/interfaces";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getChecklist } from "@/utils/misFunciones";
import { DESTINOS, HOTELES } from "@/utils/misConstantes";

type BodyChecklist = {
  inicio: string;
  fin: string;
  destino: string;
  hotel: string;
};

const filtrarPorIdHotel = (id: number, datos: HotelData[]): HotelData[] => {
  return datos.filter((item) => item.idDestino === id);
};

type Props = {
  hijo: (data: BodyChecklist) => void;
  loading: boolean;
};

export const Selectores = ({ hijo, loading }: Props) => {
  const [inicio, setInicio] = useState<Date>();
  const [fin, setFin] = useState<Date>();
  const [destino, setDestino] = useState<string>("");
  const [hoteles, setHoteles] = useState<HotelData[]>([]);
  const [hotel, setHotel] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [body, setBody] = useState<BodyChecklist>();

  const sendBody = () => {
    if (body) {
      hijo(body);
    }
  };

  const setDestinoyHotel = (destino: string): void => {
    setDestino(destino);
    setHoteles(filtrarPorIdHotel(parseInt(destino), HOTELES));
  };

  const enviarConsulta = (
    inicio: Date | undefined,
    fin: Date | undefined,
    destino: string,
    hotel: string
  ): void | object => {
    if (!inicio || !fin || !destino || !hotel) {
      setShowAlert(true);
      return;
    } else {
      setShowAlert(false);
      const dataObject = {
        inicio: inicio ? format(inicio, "yyyy-MM-dd") + " 00:00:00" : "",
        fin: fin ? format(fin, "yyyy-MM-dd") + " 23:59:59" : "",
        destino,
        hotel,
      };
      setBody(dataObject);
    }
  };

  useEffect(() => {
    sendBody();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  return (
    <div className="flex items-center gap-3 justify-start flex-wrap">
      {showAlert && (
        <div className="flex items-center justify-start w-full">
          <Alert variant={"destructive"}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Alerta</AlertTitle>
            <AlertDescription>
              Es necesario seleccionar todos los campos para generar el informe
            </AlertDescription>
          </Alert>
        </div>
      )}
      <Select onValueChange={setDestinoyHotel}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccione Destino" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="flex items-center gap-2">
              <Globe size={15} /> Destinos América
            </SelectLabel>
            {DESTINOS.map((destino) => (
              <SelectItem
                key={destino.idDestino}
                value={destino.idDestino.toString()}
              >
                {destino.ubicacion}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={setHotel} disabled={hoteles.length <= 0}>
        <SelectTrigger className="min-w-[180px] max-w-fit">
          <SelectValue placeholder="Seleccione Hotel" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="flex items-center gap-2">
              <Hotel size={15} /> Hoteles
            </SelectLabel>
            <SelectItem value={"0"}>Todos</SelectItem>
            {hoteles?.map((hotel) => (
              <SelectItem key={hotel.idHotel} value={hotel.idHotel.toString()}>
                {hotel.hotel}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !inicio && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {inicio ? format(inicio, "PPP") : <span>Fecha Inicial</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={inicio}
            onSelect={setInicio}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !fin && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fin ? format(fin, "PPP") : <span>Fecha Final</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fin}
            onSelect={setFin}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        disabled={loading}
        className="flex items-center gap-2"
        onClick={() => enviarConsulta(inicio, fin, destino, hotel)}
      >
        <RefreshCcw
          size={loading ? 22 : 15}
          className={loading ? "animate-spin" : ""}
        />{" "}
        {loading ? "" : "Actualizar"}
      </Button>
    </div>
  );
};
