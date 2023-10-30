import { ReactNode } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

type Props = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p";
  children: ReactNode;
  className?: string;
  value?: string;
};

type EstilosType = {
  [key: string]: string;
};

const Texto = ({
  as: Component = "p",
  children,
  value,
  className,
  ...props
}: Props) => {
  const estilos: EstilosType = {
    h1: "text-7xl text-foreground font-medium",
    h2: "text-5xl text-foreground font-medium",
    h3: "text-4xl text-foreground font-medium",
    h4: "text-3xl text-foreground font-medium",
    h5: "text-lg text-foreground font-medium",
    p: "text-sm text-foreground leading-none",
  };
  const estiloSeleccionado = estilos[Component];
  return (
    <Component
      {...props}
      className={`${estiloSeleccionado} ${poppins.className} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Texto;
