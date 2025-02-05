import { LegacyRef, MutableRefObject, RefCallback } from "react";

const mergeRefs =
	<T extends any>(
		refs: Array<MutableRefObject<T> | LegacyRef<T> | undefined | null>,
	): RefCallback<T> =>
	value => {
		refs.forEach(ref => {
			if (typeof ref === "function") {
				ref(value);
			} else if (ref != null) {
				(ref as MutableRefObject<T | null>).current = value;
			}
		});
	};

export { mergeRefs };
