interface Props {
  porcentaje: number;
}

const Barra = ({ porcentaje }: Props) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2 w-full">
      <div className="w-full rounded-full bg-blue-500/20 flex items-center justify-start flex-none">
        <div
          style={{ width: `${porcentaje}%` }}
          className="w-full p-1.5 rounded-full bg-green-500"
        ></div>
      </div>
    </div>
  );
};

export default Barra;
