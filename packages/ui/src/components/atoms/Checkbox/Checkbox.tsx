import clsx from "clsx";
import { useRef } from "react";
import {
	AriaCheckboxProps,
	mergeProps,
	useCheckbox,
	useFocusRing,
	VisuallyHidden,
} from "react-aria";
import { useToggleState } from "react-stately";

import { Text } from "../Text";

export function Checkbox(props: AriaCheckboxProps) {
	const { isDisabled, children } = props;

	const state = useToggleState(props);
	const ref = useRef<HTMLInputElement>(null);
	const { inputProps } = useCheckbox(props, state, ref);
	const { focusProps, isFocusVisible } = useFocusRing();

	return (
		<label
			className={clsx(
				"flex w-fit items-center pl-0.5 pr-1",
				isFocusVisible && "rounded-md ring ring-blue-300",
			)}
		>
			<VisuallyHidden>
				<input
					{...mergeProps(inputProps, focusProps)}
					ref={ref}
				/>
			</VisuallyHidden>
			<div
				className={clsx(
					"mr-1  flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 text-white transition duration-150 ease-in-out",
					state.isSelected ? "bg-blue-500" : "bg-white dark:bg-neutral-700",
					// isFocusVisible && "shadow-outline",
					!isDisabled && "cursor-pointer",
					isDisabled && "cursor-not-allowed border-gray-300",
					!isDisabled && (isFocusVisible || state.isSelected)
						? "border-blue-500"
						: "border-gray-400",
				)}
				aria-hidden="true"
			>
				<svg
					className="h-3 w-3 stroke-current"
					viewBox="0 0 18 18"
				>
					<polyline
						points="1 9 7 14 15 4"
						fill="none"
						strokeWidth={3}
						strokeDasharray={22}
						strokeDashoffset={state.isSelected ? 44 : 66}
						style={{
							transition: "all 400ms",
						}}
					/>
				</svg>
			</div>
			<Text className={clsx("select-none", isDisabled ? "cursor-not-allowed" : "cursor-pointer")}>
				{children}
			</Text>
		</label>
	);
}
