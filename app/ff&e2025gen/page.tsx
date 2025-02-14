"use client";
import { useEffect, useState } from "react";
import { Task, TaskGroup } from "./interefaces";
import Barra from "./components/barra";
type EstadoAvances = {
  Cotización: number;
  Finalizado: number;
  "Catalogo Conceptos": number;
  "Ejecución 60%": number;
  "P. Proveedor": number;
  Aprobación: number;
  "Ejecución 80%": number;
  [key: string]: number;
};
interface EstadoConteo {
  Cotización: number;
  Finalizado: number;
  "Catalogo Conceptos": number;
  "Ejecución 60%": number;
  "P. Proveedor": number;
  Aprobación: number;
  "Ejecución 80%": number;
  [key: string]: number; // Añadido para permitir indexación con claves tipo string
  totalActividades: number;
  avanceGlobal: number; // Propiedad para el avance global
}

interface ResultadosPorDestino {
  [destino: string]: EstadoConteo;
}

const avancePorEstado: { [estado: string]: number } = {
  Cotización: 10,
  Finalizado: 100,
  "Catalogo Conceptos": 20,
  "Ejecución 60%": 60,
  "P. Proveedor": 40,
  Aprobación: 30,
  "Ejecución 80%": 80,
};

function agrupar(tareas: Task[]): ResultadosPorDestino {
  const resultados: ResultadosPorDestino = {};
  const estadoAvance: EstadoAvances = {
    Cotización: 10,
    Finalizado: 100,
    "Catalogo Conceptos": 20,
    "Ejecución 60%": 60,
    "P. Proveedor": 40,
    Aprobación: 30,
    "Ejecución 80%": 80,
  };

  tareas.forEach((tarea) => {
    if (tarea.campo10 === "MANTENIMIENTO" && tarea.añoNatural === "2025") {
      if (!resultados[tarea.destino]) {
        resultados[tarea.destino] = {
          Cotización: 0,
          Finalizado: 0,
          "Catalogo Conceptos": 0,
          "Ejecución 60%": 0,
          "P. Proveedor": 0,
          Aprobación: 0,
          "Ejecución 80%": 0,
          totalActividades: 0,
          avanceGlobal: 0,
        };
      }
      const estado = tarea.estado;
      if (estado in estadoAvance) {
        resultados[tarea.destino][estado]++;
        resultados[tarea.destino].totalActividades++;
        resultados[tarea.destino].avanceGlobal += estadoAvance[estado];
      }
    }
  });

  // Calcular el avance global promedio para cada destino
  Object.keys(resultados).forEach((destino) => {
    if (resultados[destino].totalActividades > 0) {
      resultados[destino].avanceGlobal /= resultados[destino].totalActividades;
    }
  });

  return resultados;
}

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [grupo, setGrupo] = useState<ResultadosPorDestino>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            idDestino: "10",
            idUsuario: "2",
            apartado: "auditorias",
            accion: "all",
            palabra: "",
            estado: "",
          }),
        };
        const respuesta = await fetch("https://maphg.com/america/api_ffande2024/", options);
        const datosJson = await respuesta.json();
        const mapeo = datosJson.data.data.flatMap((objeto: TaskGroup) => objeto.tareas);
        setTasks(mapeo);
        setGrupo(agrupar(mapeo));
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {loading ? "Cargando ⏳" : ""}
      {grupo && (
        <div className="w-full flex flex-col items-center justify-start gap-4 mt-10">
          <h1 className="text-4xl font-medium">FF&E 2025 GLOBAL</h1>
          {grupo.RM && <Barra destino="Riviera Maya" actividades={grupo.RM.totalActividades} avance={grupo.RM.avanceGlobal} finalizadas={grupo.RM.Finalizado} cotizacion={grupo.RM.Cotización} ejecucion={grupo.RM["Ejecución 60%"] + grupo.RM["Ejecución 80%"]} catalogo={grupo.RM["Catalogo Conceptos"]} aprobacion={grupo.RM.Aprobación} proveedor={grupo.RM["P. Proveedor"]} />}
          {grupo.PVR && <Barra destino="Puerto Vallarta" actividades={grupo.PVR.totalActividades} avance={grupo.PVR.avanceGlobal} finalizadas={grupo.PVR.Finalizado} cotizacion={grupo.PVR.Cotización} ejecucion={grupo.PVR["Ejecución 60%"] + grupo.PVR["Ejecución 80%"]} catalogo={grupo.PVR["Catalogo Conceptos"]} aprobacion={grupo.PVR.Aprobación} proveedor={grupo.PVR["P. Proveedor"]} />}
          {grupo.SDQ && <Barra destino="Santo Domingo" actividades={grupo.SDQ.totalActividades} avance={grupo.SDQ.avanceGlobal} finalizadas={grupo.SDQ.Finalizado} cotizacion={grupo.SDQ.Cotización} ejecucion={grupo.SDQ["Ejecución 60%"] + grupo.SDQ["Ejecución 80%"]} catalogo={grupo.SDQ["Catalogo Conceptos"]} aprobacion={grupo.SDQ.Aprobación} proveedor={grupo.SDQ["P. Proveedor"]} />}
          {grupo.SSA && <Barra destino="Imbassai" actividades={grupo.SSA.totalActividades} avance={grupo.SSA.avanceGlobal} finalizadas={grupo.SSA.Finalizado} cotizacion={grupo.SSA.Cotización} ejecucion={grupo.SSA["Ejecución 60%"] + grupo.SSA["Ejecución 80%"]} catalogo={grupo.SSA["Catalogo Conceptos"]} aprobacion={grupo.SSA.Aprobación} proveedor={grupo.SSA["P. Proveedor"]} />}
          {grupo.PUJ && <Barra destino="Bávaro" actividades={grupo.PUJ.totalActividades} avance={grupo.PUJ.avanceGlobal} finalizadas={grupo.PUJ.Finalizado} cotizacion={grupo.PUJ.Cotización} ejecucion={grupo.PUJ["Ejecución 60%"] + grupo.PUJ["Ejecución 80%"]} catalogo={grupo.PUJ["Catalogo Conceptos"]} aprobacion={grupo.PUJ.Aprobación} proveedor={grupo.PUJ["P. Proveedor"]} />}
          {grupo.MBJ && <Barra destino="Jamaica" actividades={grupo.MBJ.totalActividades} avance={grupo.MBJ.avanceGlobal} finalizadas={grupo.MBJ.Finalizado} cotizacion={grupo.MBJ.Cotización} ejecucion={grupo.MBJ["Ejecución 60%"] + grupo.MBJ["Ejecución 80%"]} catalogo={grupo.MBJ["Catalogo Conceptos"]} aprobacion={grupo.MBJ.Aprobación} proveedor={grupo.MBJ["P. Proveedor"]} />}
          {grupo.CMU && <Barra destino="Costa Mujeres" actividades={grupo.CMU.totalActividades} avance={grupo.CMU.avanceGlobal} finalizadas={grupo.CMU.Finalizado} cotizacion={grupo.CMU.Cotización} ejecucion={grupo.CMU["Ejecución 60%"] + grupo.CMU["Ejecución 80%"]} catalogo={grupo.CMU["Catalogo Conceptos"]} aprobacion={grupo.CMU.Aprobación} proveedor={grupo.CMU["P. Proveedor"]} />}
          {grupo.CAP && <Barra destino="Capcana" actividades={grupo.CAP.totalActividades} avance={grupo.CAP.avanceGlobal} finalizadas={grupo.CAP.Finalizado} cotizacion={grupo.CAP.Cotización} ejecucion={grupo.CAP["Ejecución 60%"] + grupo.CAP["Ejecución 80%"]} catalogo={grupo.CAP["Catalogo Conceptos"]} aprobacion={grupo.CAP.Aprobación} proveedor={grupo.CAP["P. Proveedor"]} />}
        </div>
      )}
    </div>
  );
};

export default Page;
