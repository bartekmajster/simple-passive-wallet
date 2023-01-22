import { FaCog } from 'react-icons/fa';
import { Profile } from 'components/molecules';
import { Wrapper } from './Header.styles';

export const Header = () => {
  return (
    <Wrapper
      justifyContent="space-between"
      alignItems="center"
    >
      <FaCog size="1.5rem" />

      <Profile />
    </Wrapper>
  );
};

Header.displayName = 'HubHeader';
