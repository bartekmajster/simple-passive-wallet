import { FC, Fragment, useMemo } from 'react';
import { Button, Icon, Input, Loader, Select, Spacer, Spreader } from 'components/atoms';
import { FaPlus } from 'react-icons/fa';
import { Row } from 'simple-flexbox';
import { CURRENCIES_ARRAY } from 'constants/selectors/currencies';
import { useUserContext } from 'contexts/UserContext';
import { useForm } from 'react-hook-form';
import { useSelect } from 'hooks/useSelect';
import {
  CreateCashAccountInput,
  CreateCashAccountMutation,
  CreateCashAccountMutationVariables,
} from '__generated__/graphql';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { CREATE_CASH_ACCOUNT } from 'graphql/mutations';
import { showErrorToast } from 'helpers/showToast';
import { validationSchema } from './CreateCashAccountForm.schema';

interface CreateCashAccountFormProps {
  closeModal: () => void;
  callback: (data: CreateCashAccountMutation) => void;
}

export const CreateCashAccountForm: FC<CreateCashAccountFormProps> = ({ closeModal, callback }) => {
  const { t } = useTranslation();

  const { user } = useUserContext();

  const defaultValues = {
    name: '',
    currency: user.defaultCurrency,
  } satisfies CreateCashAccountInput;

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    register,
  } = useForm<CreateCashAccountInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [createCashAccount] = useMutation<
    CreateCashAccountMutation,
    CreateCashAccountMutationVariables
  >(CREATE_CASH_ACCOUNT, {
    onCompleted: data => {
      closeModal();

      callback(data);
    },
    onError: () => {
      showErrorToast(t('service.unknown_error'));
    },
  });

  const onSubmit = async (data: CreateCashAccountInput) => {
    await createCashAccount({
      variables: {
        data,
      },
    });
  };

  const currencySelectProps = useSelect<CreateCashAccountInput>({
    register,
    name: 'currency',
    errors,
  });

  const customLabel = ({ value }: { value: string }) => value;

  const options = useMemo(
    () =>
      CURRENCIES_ARRAY.map(currency => ({
        label: t(`currency.${currency}`),
        value: currency,
      })),
    [t],
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row alignItems="end">
        <Input
          placeholder={t('common.input.name.placeholder')}
          flexGrow={1}
          error={errors.name?.message}
          {...register('name')}
        />

        <Spreader spread="tiny" />

        <Select
          width="130px"
          options={options}
          customLabel={customLabel}
          defaultValue={user.defaultCurrency}
          placement="bottom-end"
          {...currencySelectProps}
        />
      </Row>

      <Spacer />

      <Row justifyContent="flex-end">
        <Button
          color="tertiary"
          onClick={closeModal}
          flexGrow={1}
          minWidth="130px"
        >
          {t('common.cancel')}
        </Button>

        <Spreader spread="small" />

        <Button
          disabled={isSubmitting || !isValid || !isDirty}
          flexGrow={1}
          minWidth="130px"
          type="submit"
        >
          {isSubmitting && <Loader color="white" />}

          {!isSubmitting && (
            <Fragment>
              {t('add.cash.accounts.button.add')}

              <Spreader spread="tiny" />

              <Icon icon={FaPlus} />
            </Fragment>
          )}
        </Button>
      </Row>
    </form>
  );
};
