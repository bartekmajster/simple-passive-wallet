import { ConfirmSignupMutation, ConfirmSignupMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Input } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "contexts/UserContext";
import { CONFIRM_SIGNUP } from "graphql/mutations/authentication/ConfirmSignup";
import { FC, lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { validationSchema } from "./Confirm.schema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

interface ConfirmFormProps {
	email: string;
}

export const ConfirmForm: FC<ConfirmFormProps> = ({ email }) => {
	const { t } = useTranslation();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const onVerify = useCallback(setToken, [setToken]);

	const navigate = useNavigate();

	const { getUser } = useUserContext();

	const defaultValues = { code: "" };

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
		mode: "onChange",
	});

	const [confirmSignup] = useMutation<ConfirmSignupMutation, ConfirmSignupMutationVariables>(
		CONFIRM_SIGNUP,
		{
			onCompleted: async () => {
				await getUser();

				navigate(ROUTES.HOME);
			},
			onError: () => {
				setError("code", { type: "custom", message: t("service.unknown_error") });
			},
		},
	);

	const onSubmit = async (data: typeof defaultValues) => {
		confirmSignup({ variables: { data: { code: data.code, email, token } } });

		setRefreshReCaptcha(r => !r);
	};

	return (
		<form
			className="flex flex-col"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Suspense>
				<GoogleReCaptcha
					onVerify={onVerify}
					refreshReCaptcha={refreshReCaptcha}
				/>
			</Suspense>

			<Input
				placeholder={t("page.confirm.input.placeholder")}
				aria-label={t("page.confirm.input.placeholder")}
				data-testid="code-input"
				isInvalid={!!errors.code}
				errorMessage={errors.code?.message}
				{...register("code")}
			/>

			<Button
				className="w-auto"
				isDisabled={isSubmitting}
				isLoading={isSubmitting}
				type="submit"
				data-testid="submit-button"
			>
				{t("form.button.submit")}
			</Button>
		</form>
	);
};
