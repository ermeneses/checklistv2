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
const Selects = () => {
  const [destinos, setDestinos] = useState<Interfacedestino[]>([]);
  const [hoteles, setHoteles] = useState<Interfacehotel[]>([]);
  const [destino, setDestino] = useState("");
  const [hotel, setHotel] = useState("");

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
  const logeo = () => {
    console.log(`Destino:${destino} Hotel: ${hotel}`);
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
          <DatePickerWithRange />
          <Separator orientation="vertical" />
          <Button
            onClick={() => logeo()}
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
