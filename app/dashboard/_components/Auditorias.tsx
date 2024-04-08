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

const Auditorias = ({ idDestino, codDestino, fecha2022, fecha2023, ubicacion }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      <div className={ubicacion ? "w-full md:w-96 text-left text-lg font-bold" : "w-full md:w-28 text-center font-bold text-xl"}>
        <Texto className="text-xl md:text-3xl">{ubicacion ? ubicacion : codDestino}</Texto>
      </div>
      <div className="grid grid-cols-1 grid-flow-row w-full gap-3">
        {/* <Auditoria2022 destino={codDestino} fecha={fecha2022} /> */}
        <Auditoria2023 destino={idDestino} fecha={fecha2023} />
      </div>
    </div>
  );
};

export default Auditorias;
