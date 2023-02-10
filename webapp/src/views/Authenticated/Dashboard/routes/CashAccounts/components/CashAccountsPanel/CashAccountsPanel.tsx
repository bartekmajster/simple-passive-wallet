import { Row } from 'simple-flexbox';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GetCashAccountsQuery } from '__generated__/graphql';
import { Panel } from 'components/molecules';
import { Button, Spacer, Spreader, Text } from 'components/atoms';
import { FaChartLine, FaEdit, FaListUl, FaPlus } from 'react-icons/fa';
import { useModalContext } from 'contexts/ModalContext';
import { AddFundsCashAccountProps, MODAL_ADD_FUNDS_CASH_ACCOUNT } from 'modals/AddFundsCashAccount';
import { ManageCashAccountProps, MODAL_MANAGE_CASH_ACCOUNT } from 'modals/ManageCashAccount';

interface CashAccountsPanelProps {
  updateCashAccountBalance: (data: { balance: number; uuid: string }) => void;
}

export const CashAccountsPanel: FC<
  GetCashAccountsQuery['cashAccounts'][0] & CashAccountsPanelProps
> = ({ name, currency, balance, uuid, updateCashAccountBalance }) => {
  const { i18n, t } = useTranslation();

  const formatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
  });

  const { openModal } = useModalContext();

  const handleOpenAddFundsCashAccountModal = () => {
    openModal<AddFundsCashAccountProps>(MODAL_ADD_FUNDS_CASH_ACCOUNT, {
      callback: updateCashAccountBalance,
      uuid,
      currency,
    });
  };

  const handleOpenMamageCashAccountModal = () => {
    openModal<ManageCashAccountProps>(MODAL_MANAGE_CASH_ACCOUNT, {});
  };

  return (
    <Panel>
      <Panel.Body>
        <Row>
          <Button
            flexGrow={1}
            onClick={handleOpenAddFundsCashAccountModal}
          >
            <FaPlus />
          </Button>

          <Spreader />

          <Button flexGrow={1}>
            <FaEdit />
          </Button>

          <Spreader />

          <Button
            flexGrow={1}
            onClick={handleOpenMamageCashAccountModal}
          >
            <FaListUl />
          </Button>
        </Row>

        <Spacer space="small" />

        <Button
          width="100%"
          flexGrow={1}
        >
          {t('page.cash_accounts.button.invest')} <Spreader spread="tiny" /> <FaChartLine />
        </Button>
      </Panel.Body>

      <Panel.Footer>
        <Row justifyContent="space-between">
          <Text
            fontWeight="700"
            maxWidth="120px"
          >
            {name}
          </Text>

          <Text
            maxWidth="120px"
            textAlign="right"
          >
            {formatter.format(balance)}
          </Text>
        </Row>
      </Panel.Footer>
    </Panel>
  );
};
