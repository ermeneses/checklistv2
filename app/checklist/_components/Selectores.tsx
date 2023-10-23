"use client";
import { useState } from "react";
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
import { Globe, RefreshCcw } from "lucide-react";
import type { HotelData } from "@/types/interfaces";

const destinos = [
  {
    idDestino: 1,
    destino: "RM",
    ubicacion: "Riviera Maya",
    status: "A",
    bandera: "cun.svg",
    division: 901,
    superficie: "850000",
    habitaciones: 1554,
  },
  {
    idDestino: 2,
    destino: "PVR",
    ubicacion: "Puerto Vallarta",
    status: "A",
    bandera: "pvr.svg",
    division: 900,
    superficie: "84000",
    habitaciones: 518,
  },
  {
    idDestino: 3,
    destino: "SDQ",
    ubicacion: "Santo Domingo",
    status: "A",
    bandera: "sdq.svg",
    division: 911,
    superficie: "43000",
    habitaciones: 269,
  },
  {
    idDestino: 4,
    destino: "SSA",
    ubicacion: "Imbassaí",
    status: "A",
    bandera: "ssa.svg",
    division: 930,
    superficie: "170000",
    habitaciones: 654,
  },
  {
    idDestino: 5,
    destino: "PUJ",
    ubicacion: "Bávaro",
    status: "A",
    bandera: "puj.svg",
    division: 910,
    superficie: "780000",
    habitaciones: 1993,
  },
  {
    idDestino: 6,
    destino: "MBJ",
    ubicacion: "Jamaica",
    status: "A",
    bandera: "mbj.svg",
    division: 920,
    superficie: "340000",
    habitaciones: 1054,
  },
  {
    idDestino: 7,
    destino: "CMU",
    ubicacion: "Costa Mujeres",
    status: "A",
    bandera: "cmu.svg",
    division: 904,
    superficie: "520000",
    habitaciones: 1146,
  },
  {
    idDestino: 10,
    destino: "AME",
    ubicacion: "America",
    status: "A",
    bandera: "all.svg",
    division: 0,
    superficie: null,
    habitaciones: 1,
  },
  {
    idDestino: 11,
    destino: "CAP",
    ubicacion: "Capcana",
    status: "A",
    bandera: "puj.svg",
    division: 917,
    superficie: "20000",
    habitaciones: 115,
  },
  {
    idDestino: 12,
    destino: "NYC",
    ubicacion: "45 Times Square",
    status: "A",
    bandera: "puj.svg",
    division: 917,
    superficie: "20000",
    habitaciones: 115,
  },
];
const hoteles: HotelData[] = [
  {
    idHotel: 8,
    idDestino: 1,
    hotel: "GRAND PALLADIUM WHITE SAND RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 7,
    idDestino: 1,
    hotel: "GRAND PALLADIUM KANTENAH RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 6,
    idDestino: 1,
    hotel: "GRAND PALLADIUM COLONIAL RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 5,
    idDestino: 1,
    hotel: "TRS YUCATAN HOTEL",
    marca: "TRS",
  },
  {
    idHotel: 15,
    idDestino: 2,
    hotel: "FAMILY SELECTION AT GRAND PALLADIUM VALLARTA RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 14,
    idDestino: 2,
    hotel: "GRAND PALLADIUM VALLARTA RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 10,
    idDestino: 3,
    hotel: "DOMINICAN FIESTA",
    marca: "GP",
  },
  {
    idHotel: 28,
    idDestino: 4,
    hotel: "GRAND PALLADIUM IMBASSAI RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 4,
    idDestino: 5,
    hotel: "TRS TURQUESA",
    marca: "TRS",
  },
  {
    idHotel: 3,
    idDestino: 5,
    hotel: "GP PUNTA CANA",
    marca: "GP",
  },
  {
    idHotel: 2,
    idDestino: 5,
    hotel: "GP PALACE",
    marca: "GP",
  },
  {
    idHotel: 1,
    idDestino: 5,
    hotel: "GP BAVARO",
    marca: "GP",
  },
  {
    idHotel: 27,
    idDestino: 6,
    hotel: "GRAND PALLADIUM LADY HAMILTON RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 26,
    idDestino: 6,
    hotel: "GRAND PALLADIUM JAMAICA RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 13,
    idDestino: 7,
    hotel: "GRAND PALLADIUM COSTA MUJERES RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 12,
    idDestino: 7,
    hotel: "FAMILY SELECTION AT GRAND PALLADIUM COSTA MUJERES RESORT & SPA",
    marca: "GP",
  },
  {
    idHotel: 11,
    idDestino: 7,
    hotel: "TRS CORAL HOTEL",
    marca: "TRS",
  },
  {
    idHotel: 25,
    idDestino: 11,
    hotel: "TRS Cap Cana",
    marca: "TRS",
  },
  {
    idHotel: 29,
    idDestino: 12,
    hotel: "NY",
    marca: "OY",
  },
];

const filtrarPorIdHotel = (id: number, datos: HotelData[]): HotelData[] => {
  return datos.filter((item) => item.idDestino === id);
};

interface MiComponenteProps {
  nombre?: string;
}

export const Selectores = ({ nombre }: MiComponenteProps) => {
  const [inicio, setInicio] = useState<Date>();
  const [fin, setFin] = useState<Date>();
  const [destino, setDestino] = useState<string>("");
  const [hotel, setHotel] = useState<HotelData[]>([]);

  const setDestinoyHotel = (destino: string): void => {
    setDestino(destino);
    setHotel(filtrarPorIdHotel(parseInt(destino), hoteles));
  };

  return (
    <div className="flex items-center gap-3 justify-start flex-wrap">
      <Select onValueChange={setDestinoyHotel}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccione Destino" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="flex items-center gap-2">
              <Globe size={15} /> Destinos América
            </SelectLabel>
            {destinos.map((destino) => (
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
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccione Hotel" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {hotel?.map((hotel) => (
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
      <Button className="flex items-center gap-2">
        <RefreshCcw size={17} /> Actualizar
      </Button>
      <div className="bg-indigo-200 text-indigo-600">{destino}</div>
    </div>
  );
};
