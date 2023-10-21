"use client";
import { BoxIcon, CubeIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./ModeToggle";
import { Logo } from "./Logo";

export default function NavMenu() {
  return (
    <div className="bg-background flex justify-between px-4 py-2 border-b border-b-foreground/5">
      <Logo />
      <ModeToggle />
    </div>
  );
}
