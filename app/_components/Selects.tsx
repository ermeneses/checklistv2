"use client";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader, RefreshCw } from "lucide-react";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface Interfacedestino {
  idDestino: number;
  destino: string;
  ubicacion: string;
  status: string;
  bandera: string;
  division: number;
  superficie: string;
  habitaciones: number;
}
interface Interfacehotel {
  idHotel: number;
  idDestino: number;
  hotel: string;
  marca: string;
}

interface interfacechecklist {
  idRegistro: string;
  destino: string;
  nombreDestino: string;
  hotel: string;
  sabana: string;
  equipo: string;
  creadoPor: string;
  fechaCreado: string;
  fechaFinalizado: string;
  actividad: string;
  idActividad: string;
  valor: string;
  comentario: string;
  adjunto: string;
  reportado: string;
  mes: string;
}

interface Actividad {
  idRegistro: string;
  destino: string;
  nombreDestino: string;
  hotel: string;
  sabana: string;
  equipo: string;
  creadoPor: string;
  fechaCreado: string;
  fechaFinalizado: string;
  actividad: string;
  idActividad: string;
  valor: string;
  comentario: string;
  adjunto: string;
  reportado: string;
  mes: string;
}

const transformarArray = (array: Actividad[]) => {
  if (!Array.isArray(array)) {
    throw new Error("Se esperaba un array");
  }

  let registros: { [id: string]: boolean } = {};
  let actividades: number = array.length;
  let valor: { [key: string]: number } = {
    NO: 0,
    SI: 0,
    "N/A": 0,
  };
  let reportado: { [key: string]: number } = {
    NO: 0,
    SI: 0,
  };

  array.forEach((actividad) => {
    if (!registros[actividad.idRegistro]) {
      registros[actividad.idRegistro] = true;
    }
    valor[actividad.valor] = (valor[actividad.valor] || 0) + 1;
    reportado[actividad.reportado] = (reportado[actividad.reportado] || 0) + 1;
  });

  console.log({
    Registros: Object.keys(registros).length,
    Actividades: actividades,
    Valor: valor,
    Reportado: reportado,
  });
};

const getDateMinusSevenDays = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return sevenDaysAgo;
};

const Selects = () => {
  const [destinos, setDestinos] = useState<Interfacedestino[]>([]);
  const [hoteles, setHoteles] = useState<Interfacehotel[]>([]);
  const [checklist, setChecklist] = useState<interfacechecklist[]>([]);
  const [destino, setDestino] = useState("");
  const [hotel, setHotel] = useState("");
  const [fechas, setFechas] = useState<DateRange | undefined>(undefined);

  const cambiarFechas = (nuevaFecha: DateRange | undefined) => {
    setFechas(nuevaFecha);
    // console.log(fechas);
  };

  useEffect(() => {
    const fetchDestinos = async () => {
      const res = await fetch("https://maphg.com/america/api_v3/", {
        method: "POST",
        body: JSON.stringify({
          apartado: "destinos",
          accion: "all",
          idDestino: 0,
        }),
      });
      const data = await res.json();
      setDestinos(
        data.data.filter((obj: Interfacedestino) => obj.idDestino !== 10)
      );
    };

    fetchDestinos();
  }, []);

  const fetchHoteles = async (idDestino: string) => {
    try {
      const res = await fetch("https://maphg.com/america/api_v3/", {
        method: "POST",
        body: JSON.stringify({
          apartado: "sabanas",
          accion: "hoteles",
          idDestinoSeleccionado: idDestino,
        }),
      });
      const data = await res.json();
      setHoteles(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDetinoActivateHoteres = (nuevoValor: string) => {
    setHoteles([]);
    setDestino(nuevoValor);
    fetchHoteles(nuevoValor);
  };

  const fetchChecklist = async (
    idDestino: string,
    idHotel: string,
    inicio: number,
    fin: number
  ) => {
    try {
      const res = await fetch("https://maphg.com/america/api_v3/", {
        method: "POST",
        body: JSON.stringify({
          apartado: "checkList",
          accion: "all2",
          idUsuario: "1",
          idDestino: idDestino.toString(),
          idHotel: idHotel.toString(),
          idCheckList: "0",
          fechaInicio: inicio ? format(inicio, "yyyy-MM-dd") + " 00:00:00" : "",
          fechaFin: fin ? format(fin, "yyyy-MM-dd") + " 23:59:59" : "",
        }),
      });
      const data = await res.json();
      setChecklist(data.data);
      transformarArray(data.data.actividades);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-5 items-center space-x-4 text-sm w-full">
      <div>
        <Select onValueChange={updateDetinoActivateHoteres}>
          <SelectTrigger className="w-[185px]">
            <SelectValue
              placeholder={
                destinos.length === 0 ? (
                  <Loader className="opacity-50 animate-spin" />
                ) : (
                  "Seleccione Destino"
                )
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Destinos</SelectLabel>
              {destinos.length > 0 && <SelectItem value="0">Todos</SelectItem>}
              {destinos.map((destino) => (
                <SelectItem
                  key={destino.destino}
                  value={destino.idDestino.toString()}
                >
                  {destino.ubicacion}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {destino !== "" && (
        <>
          <Separator orientation="vertical" />
          <div className="w-auto">
            <Select onValueChange={setHotel}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    hoteles.length === 0 ? (
                      <Loader className="opacity-50 animate-spin" />
                    ) : (
                      "Seleccione Hotel"
                    )
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Hoteles</SelectLabel>
                  <SelectItem value="0">Todos</SelectItem>
                  {hoteles.map((hotel) => (
                    <SelectItem
                      value={hotel.idHotel.toString()}
                      key={hotel.idHotel}
                    >
                      {hotel.hotel}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Separator orientation="vertical" />
          <DatePickerWithRange onChange={cambiarFechas} />
          <Separator orientation="vertical" />
          <Button
            onClick={() =>
              fetchChecklist(
                destino,
                hotel,
                fechas && fechas.from ? fechas.from.getTime() : 0,
                fechas && fechas.to ? fechas.to.getTime() : 0
              )
            }
            className="flex gap-2"
            variant={"default"}
          >
            <RefreshCw size={15} /> Update
          </Button>
        </>
      )}
    </div>
  );
};

export default Selects;
