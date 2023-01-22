import { Column } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const Content = styled(Column)`
  min-height: 100%;
  min-height: var(--doc-height);

  ${({ theme }) => css`
    background-color: ${theme.colors.gray100};
    padding: ${theme.spacing.large};

    ${theme.breakpoints.desktop.min} {
      margin-left: 270px;
      padding: ${theme.spacing.huge};
      padding-top: 98px;
    }

    ${theme.breakpoints.desktop.max} {
      padding-top: 90px; // height of the hub header
      padding-bottom: 150px; // some space for the footer
    }
  `}
`;

export const Center = styled(Column).attrs({
  justifyContent: 'center',
})`
  flex-grow: 1;
`;
