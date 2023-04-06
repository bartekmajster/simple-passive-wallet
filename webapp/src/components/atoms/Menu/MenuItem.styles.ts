import { transparentize } from 'color2k';
import { Link } from 'react-router-dom';
import styled, { css, DefaultTheme } from 'styled-components';

const mixin = css<{
  padding: keyof DefaultTheme['padding'];
}>`
  display: flex;
  align-items: center;
  border: none;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  text-align: left;

  ${({ theme, padding }) => css`
    color: ${theme.colors.text};
    padding: ${theme.padding[padding]};

    &:focus-visible {
      outline: 2px solid ${theme.colors.blue};
    }

    &:hover {
      background-color: ${transparentize(theme.colors.gray300, 0.75)};
    }
  `};
`;

export const StyledButton = styled.button<{
  isSelected: boolean;
  padding: keyof DefaultTheme['padding'];
}>`
  ${mixin}

  ${({ theme, isSelected }) => css`
    ${isSelected &&
    css`
      font-weight: ${theme.font.weight[700]};
    `}
  `}
`;

export const StyledLink = styled(Link)<{
  padding: keyof DefaultTheme['padding'];
}>`
  ${mixin}

  text-decoration: none;
`;
