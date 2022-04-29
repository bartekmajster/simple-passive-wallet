import styled, { keyframes } from 'styled-components';
import { Colors } from 'styles/theme';

const clip = keyframes`
	0% { transform: rotate(0); }
	100% { transform: rotate(360deg); }
`;

export type Size = 'small' | 'medium' | 'large';
export type LoaderColors = 'blue' | 'pink' | 'gray' | 'silver' | 'white';

const defaultProps = {
  size: 'medium' as Size,
  color: 'blue' as Colors,
};

type LoaderProps = {
  size?: Size;
  color?: Colors;
} & typeof defaultProps;

const StyledLoader = styled.div<LoaderProps>`
  align-self: center;
  background: transparent;
  box-sizing: border-box;
  width: ${({ size, theme }) => theme.loader.size[size]};
  height: ${({ size, theme }) => theme.loader.size[size]};
  border-radius: 100%;
  margin: 0 auto ${({ size, theme }) => theme.loader.size[size]};
  border: 3px solid ${({ color }) => color};
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  display: inline-block;
  animation: ${clip} 1s linear infinite;
  animation-fill-mode: both;
`;

export const Loader = ({ size, color }: LoaderProps): JSX.Element => (
  <StyledLoader
    color={color}
    size={size}
  />
);

Loader.defaultProps = defaultProps;
