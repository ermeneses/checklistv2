import Auditoria2022 from "./Auditoria2022";
import Auditoria2023 from "./Auditoria2023";
import Texto from "./Texto";

type Props = {
  idDestino: number;
  ubicacion?: string;
  codDestino: string;
  fecha2022: string; //mes dia año
  fecha2023: string; //mes dia año
};

const Auditorias = ({
  idDestino,
  codDestino,
  fecha2022,
  fecha2023,
  ubicacion,
}: Props) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div
        className={
          ubicacion
            ? "w-44 text-left text-lg font-bold"
            : "w-28 text-center font-bold text-xl"
        }
      >
        <Texto>{ubicacion ? ubicacion : codDestino}</Texto>
      </div>
      <div className="grid grid-cols-1 grid-flow-row w-full gap-3">
        <Auditoria2022 destino={codDestino} fecha={fecha2022} />
        <Auditoria2023 destino={idDestino} fecha={fecha2023} />
      </div>
    </div>
  );
};

export default Auditorias;
