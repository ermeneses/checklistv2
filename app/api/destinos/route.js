import axios from "axios";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  try {
    const response = await axios.post("https://maphg.com/america/api_v3", {
      apartado: "destinos",
      accion: "all",
      idDestino: 0,
    });
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error("Error fetching data: ", error);
    // Aquí puedes enviar una respuesta de error si es necesario
    res.status(500).json({ error: "Error fetching data" });
  }
}
