import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-5 bg-white rounded-[24px] shadow-[0px_6px_24px_rgba(188,204,204,0.3)] border border-[#EFF1F6] h-fit",
        className
      )}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-6",
        caption: "flex justify-between items-center relative pt-1 px-1",
        caption_label: "text-sm font-bold text-[#131316] absolute left-1/2 -translate-x-1/2",
        nav: "flex items-center justify-between w-full z-10",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          // !outline-none and !ring-0 kill the blue border
          "h-7 w-7 bg-transparent p-0 opacity-100 hover:opacity-70 transition-opacity !border-none !outline-none !ring-0 !ring-offset-0"
        ),
        table: "w-full border-collapse flex flex-col",
        head: "flex w-full",
        head_row: "flex w-full justify-between mb-4",
        head_cell: "text-[#56616B] w-10 font-medium text-[12px] uppercase text-center flex items-center justify-center",
        tbody: "flex flex-col w-full",
        row: "flex w-full mt-2 justify-between",
        cell: "h-10 w-10 text-center text-sm p-0 relative flex items-center justify-center focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          // !outline-none and !ring-0 applied to the day itself
          "h-10 w-10 p-0 font-medium rounded-full transition-all !border-none !outline-none !ring-0 !ring-offset-0 !shadow-none"
        ),
        day_selected: "opacity-100", // Control opacity via tailwind
        day_today: "text-[#131316] font-extrabold",
        day_outside: "text-[#56616B] opacity-20",
        day_disabled: "text-gray-200 opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      // Inline styles to force selection color and kill the blue box-shadow
      modifiersStyles={{
        selected: {
          backgroundColor: "#131316",
          color: "white",
          borderRadius: "100%",
          boxShadow: "none", // This specifically kills the blue border/shadow
          outline: "none",    // This kills the blue browser ring
        }
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-5 w-5 text-[#131316]" />,
        IconRight: () => <ChevronRight className="h-5 w-5 text-[#131316]" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"
export { Calendar }