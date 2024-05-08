interface Props {
  destino: string;
  actividades: number;
  avance: number;
  finalizadas: number;
  cotizacion: number;
  ejecucion: number;
  catalogo: number;
  aprobacion: number;
  proveedor: number;
}
const Barra = (props: Props) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2">
      <div className="w-full md:w-3/5 xl:w-3/5 lg:w-3/5 flex flex-row items-center justify-between flex-wrap gap-2 self-center">
        <div className="flex sm:w-auto md:w-auto flex-col items-start justify-center flex-none w-full">
          <h1 className="leading-none font-bold uppercase">{props.destino}</h1>
          <h4 className="leading-none font-light">FF&amp;E 2024</h4>
        </div>
        <div className="flex items-center justify-start gap-10">
          <div className="flex flex-col items-center justify-center self-stretch">
            <h1 className="leading-none text-xl">{props.actividades}</h1>
            <h4 className="leading-none font-light">Actividades</h4>
          </div>
          <div className="flex flex-col items-center justify-center self-stretch">
            <h1 className="leading-none text-xl">{props.avance.toFixed(1)}%</h1>
            <h4 className="leading-none font-light">Avance Global</h4>
          </div>
          <div className="flex flex-col items-start justify-center self-stretch text-xs uppercase">
            <div className="flex items-center justify-start gap-1">
              <div className="w-2 h-2 rounded-sm bg-green-400"></div>
              <h4 className="leading-none font-light">{props.finalizadas}- Finalizadas</h4>
            </div>
            <div className="flex items-center justify-start gap-1">
              <div className="w-2 h-2 rounded-sm bg-red-400"></div>
              <h4 className="leading-none font-light">{props.cotizacion}- En Cotizacion</h4>
            </div>
            <div className="flex items-center justify-start gap-1">
              <div className="w-2 h-2 rounded-sm bg-teal-400"></div>
              <h4 className="leading-none font-light">{props.ejecucion}- En Ejecución</h4>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center self-stretch text-xs uppercase">
            <div className="flex items-center justify-start gap-1">
              <div className="w-2 h-2 rounded-sm bg-orange-400"></div>
              <h4 className="leading-none font-light">{props.catalogo}- En Catálogo C.</h4>
            </div>
            <div className="flex items-center justify-start gap-1">
              <div className="w-2 h-2 rounded-sm bg-yellow-400"></div>
              <h4 className="leading-none font-light">{props.aprobacion}- Aprovación</h4>
            </div>
            <div className="flex items-center justify-start gap-1">
              <div className="w-2 h-2 rounded-sm bg-blue-400"></div>
              <h4 className="leading-none font-light">{props.proveedor}- P. Proveedor</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/5 xl:w-3/5 lg:w-3/5 self-center flex items-center justify-start bg-neutral-100 dark:bg-neutral-700 p-1 rounded-xl overflow-hidden gap-1">
        <div className="h-full bg-green-500 p-2 rounded-lg " style={{ width: props.avance + "%" }}></div>
      </div>
    </div>
  );
};

export default Barra;
