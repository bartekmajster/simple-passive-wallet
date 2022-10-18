import { Heading, Spacer, ThemeSwitcher } from 'components/atoms';
import { LangSelector } from 'components/molecules';
import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';
import { NavList } from './components/NavList';
import { sidebarNavigation } from './constants';
import { StyledColumn } from './Sidebar.styles';

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <StyledColumn justifyContent="space-between">
      <Column>
        <Heading
          level="h2"
          fontSize="1.25"
        >
          {t('common.dashboard')}
        </Heading>

        <Spacer space="small" />

        <NavList navigation={sidebarNavigation} />
      </Column>

      <Column alignItems="center">
        <ThemeSwitcher />

        <Spacer />

        <LangSelector />
      </Column>
    </StyledColumn>
  );
};
