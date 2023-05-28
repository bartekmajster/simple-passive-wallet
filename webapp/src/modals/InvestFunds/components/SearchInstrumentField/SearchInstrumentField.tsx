import { SearchInstrumentCombobox, useSearchInstrumentComboboxForm } from 'components/molecules';
import { InvestFundsFormValues } from 'modals/InvestFunds/helpers/defaultValues';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

export const SearchInstrumentField = () => {
  const { t } = useTranslation();

  const { control, setValue } = useFormContext<InvestFundsFormValues>();

  const searchInstrumentProps = useSearchInstrumentComboboxForm({
    control,
    name: 'instrument',
    setValue,
  });

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.instrument')}
      htmlFor="instrument"
    >
      <SearchInstrumentCombobox
        {...searchInstrumentProps}
        id="instrument"
        flexGrow={1}
      />
    </FormField>
  );
};
