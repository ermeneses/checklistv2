"use client";

import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormLabel } from "@/components/ui/form";

interface Props {
  onFechaChange: (text: Date) => void;
  label: string;
}

export function DatePicker({ onFechaChange, label }: Props) {
  const [date, setDate] = useState<Date>(new Date());
  const changeFecha = (event: Date) => {
    const newText = event;
    setDate(newText);
    onFechaChange(newText);
    // console.log(date);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal flex items-center relative",
            !date && "text-muted-foreground"
          )}
        >
          <span className="absolute -top-5 font-medium"> {label}</span>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toString().substring(0, 15) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          //   onSelect={changeFecha}
          initialFocus
          onDayClick={changeFecha}
        />
      </PopoverContent>
    </Popover>
  );
}
