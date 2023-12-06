import Texto from "@/app/dashboard/_components/Texto";
import Barra from "./Barra";

interface Props {
  nombreDestino: string;
  avance2022: number;
  avance2023: number;
}

const Mp = ({ nombreDestino, avance2022, avance2023 }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-2">
      <div className="flex md:flex-col gap-2">
        <Texto className="w-full md:w-72 text-xl md:text-3xl font-bold">
          {nombreDestino}
        </Texto>
      </div>
      <div className="flex w-full items-center ">
        <div className="flex flex-col gap-4 w-full ">
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Texto className="font-bold text-xl">2022</Texto>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <Texto className="text-xs">{avance2022}%</Texto>
              </div>
            </div>
            <Barra porcentaje={avance2022} />
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Texto className="font-bold text-xl">2023</Texto>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <Texto className="text-xs">{avance2023}%</Texto>
              </div>
            </div>
            <Barra porcentaje={avance2023} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mp;
