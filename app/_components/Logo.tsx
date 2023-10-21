import Image from "next/image";
import { Poppins, Josefin_Sans, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

const font = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "500"],
});

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Layers size={22} rotate={90} />
      <p className={cn("font-[600] text-[1.2rem]", font.className)}>MAPHG</p>
    </div>
  );
};
