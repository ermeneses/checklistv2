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
import type {
  Destino,
  Hotel,
  Checklist,
  Actividad,
  Resumen1,
} from "@/types/interfaces";

type SelectsProps = {
  onData: (data: Resumen1) => void;
};

const transformarArray = (array: Actividad[]): Resumen1 => {
  if (!Array.isArray(array)) {
    throw new Error("Se esperaba un array");
  }

  let registros: { [id: string]: boolean } = {};
  let actividades: number = array.length;
  let valor: { NO: number; SI: number; "N/A": number } = {
    NO: 0,
    SI: 0,
    "N/A": 0,
  };
  let reportado: { NO: number; SI: number } = {
    NO: 0,
    SI: 0,
  };

  array.forEach((actividad) => {
    if (!registros[actividad.idRegistro]) {
      registros[actividad.idRegistro] = true;
    }
    if (
      actividad.valor === "NO" ||
      actividad.valor === "SI" ||
      actividad.valor === "N/A"
    ) {
      valor[actividad.valor] = (valor[actividad.valor] || 0) + 1;
    }
    if (actividad.reportado === "NO" || actividad.reportado === "SI") {
      reportado[actividad.reportado] =
        (reportado[actividad.reportado] || 0) + 1;
    }
  });

  const resumen: Resumen1 = {
    Registros: Object.keys(registros).length,
    Actividades: actividades,
    Valor: valor,
    Reportado: reportado,
  };

  return resumen;
};

const getDateMinusSevenDays = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return sevenDaysAgo;
};

const Selects: React.FC<SelectsProps> = (props) => {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [checklist, setChecklist] = useState<Checklist[]>([]);
  const [destino, setDestino] = useState("");
  const [hotel, setHotel] = useState("");
  const [fechas, setFechas] = useState<DateRange | undefined>(undefined);
  const [cargando, setCargando] = useState(false);
  const [data, setData] = useState<Resumen1 | null>(null);

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
      setDestinos(data.data.filter((obj: Destino) => obj.idDestino !== 10));
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
    setCargando(true);
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
      setCargando(false);
      if (!data.data.actividades || data.data.actividades.length === 0) {
        props.onData({
          Registros: 0,
          Actividades: 0,
          Valor: {
            NO: 0,
            SI: 0,
            "N/A": 0,
          },
          Reportado: {
            NO: 0,
            SI: 0,
          },
        });
      } else {
        props.onData(transformarArray(data.data.actividades));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-start text-sm w-full flex-wrap gap-2">
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
            disabled={cargando}
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
            <RefreshCw
              size={cargando ? 20 : 15}
              className={cargando ? "animate-spin" : ""}
            />{" "}
            {cargando ? "Espere..." : "Actualizar"}
          </Button>
        </>
      )}
    </div>
  );
};

export default Selects;
