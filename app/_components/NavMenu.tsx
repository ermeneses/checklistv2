"use client";
import { BoxIcon, CubeIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./ModeToggle";
import { Logo } from "./Logo";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavMenu() {
  return (
    <div className="bg-background flex justify-between px-4 py-2 border-b border-b-foreground/5">
      <Sheet>
        <SheetTrigger>
          <Logo />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle> Dashboards MAPHG</SheetTitle>
          </SheetHeader>
          <div className="w-full flex flex-col items-start justify-start pt-10 gap-4">
            <SheetClose asChild>
              <Link href={"/"} className="text-left w-full p-2 rounded-lg px-4 hover:font-medium hover:bg-slate-100 dark:hover:bg-slate-900/60">
                Auditorías PROPCO
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/mc"} className="text-left w-full p-2 rounded-lg px-4 hover:font-medium hover:bg-slate-100 dark:hover:bg-slate-900/60">
                Mantenimiento Correctivo
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/mp"} className="text-left w-full p-2 rounded-lg px-4 hover:font-medium hover:bg-slate-100 dark:hover:bg-slate-900/60">
                Mantenimiento Preventivo
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/ff&e2024"} className="text-left w-full p-2 rounded-lg px-4 hover:font-medium hover:bg-slate-100 dark:hover:bg-slate-900/60">
                FF&E2024 MANTENIMIENTO
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/ff&e2024gen"} className="text-left w-full p-2 rounded-lg px-4 hover:font-medium hover:bg-slate-100 dark:hover:bg-slate-900/60">
                FF&E2024 GENERAL
              </Link>
            </SheetClose>
            {/* <SheetClose asChild>
              <Link
                href={"/checklist"}
                className="text-left w-full p-2 rounded-lg px-4 hover:font-medium hover:bg-slate-100 dark:hover:bg-slate-900/60"
              >
                Checklist Habitaciones
              </Link>
            </SheetClose> */}
          </div>
        </SheetContent>
      </Sheet>

      <ModeToggle />
    </div>
  );
}
