import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import { twMerge } from "tailwind-merge";

import { buttonVariants } from "../Button";

const IconLeft = () => <ChevronLeft className="size-4" />;

const IconRight = () => <ChevronRight className="size-4" />;

export type CalendarProps = ComponentProps<typeof DayPicker>;

const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => (
	<DayPicker
		captionLayout="dropdown-buttons"
		showOutsideDays={showOutsideDays}
		className={twMerge("p-3", className)}
		classNames={{
			months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
			month: "space-y-4",
			caption: "flex justify-center pt-1 relative items-center",
			caption_label: "hidden",
			nav: "space-x-1 flex items-center",
			nav_button: twMerge(
				buttonVariants({ variant: "outline" }),
				"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
			),
			nav_button_previous: "absolute left-1",
			nav_button_next: "absolute right-1",
			table: "w-full border-collapse space-y-1",
			head_row: "flex",
			head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
			row: "flex w-full mt-2",
			cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
			day: twMerge(
				buttonVariants({ variant: "ghost" }),
				"h-9 w-9 p-0 font-normal aria-selected:opacity-100",
			),
			day_range_end: "day-range-end",
			day_selected:
				"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
			day_today: "bg-accent text-accent-foreground",
			day_outside:
				"day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
			day_disabled: "text-muted-foreground opacity-50",
			day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
			day_hidden: "invisible",
			dropdown: "bg-transparent",
			caption_dropdowns: "flex gap-0.5",
			dropdown_month: "[&>*:first-child]:hidden",
			dropdown_year: "[&>*:first-child]:hidden",
			...classNames,
		}}
		components={{
			IconLeft,
			IconRight,
		}}
		{...props}
	/>
);

Calendar.displayName = "Calendar";

export { Calendar };
