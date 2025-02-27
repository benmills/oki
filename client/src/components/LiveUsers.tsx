import { MouseEvent } from 'react';
import { User } from 'react-feather';
import styled, { keyframes } from 'styled-components';
import { UserModal } from './UserModal';
import { UserObj } from '../App';

type LiveUsersProps = {
  count: number;
  userHistory: UserObj[];
  onToggleModal: () => void;
  showUserModal: boolean;
};

const LiveUsers = ({ count, userHistory, showUserModal, onToggleModal }: LiveUsersProps) => {
  const isLiveChat = count >= 2;

  return (
    <Wrapper>
      <LiveUsersWrapper onClick={onToggleModal}>
        <StyledUser />{' '}
        {count}
      </LiveUsersWrapper>
      {showUserModal && <UserModal users={userHistory} onClose={onToggleModal} />}
      <DotWrapper>
        {isLiveChat ? (
          <>
            <Dot status="live" />
            <PulseDot status="live" />
          </>
        ) : (
          <Dot status="alone" />
        )}
      </DotWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledUser = styled(User)`
  width: ${18 / 16}rem;
  height: ${18 / 16}rem;
`;

const LiveUsersWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #171717;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: red;
  font-weight: bold;
  font-size: 1rem;
  border: none;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.25;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const DotWrapper = styled.div`
  position: relative;
`;

const Dot = styled.div<{
  status: 'live' | 'alone',
}>`
  background-color: ${props => (props.status === 'live' ? 'red' : 'gray')};
  border-radius: 50%;
  width: 10px;
  height: 10px;
`;

const PulseDot = styled(Dot)`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${pulse} 1.25s infinite linear;
`;

export default LiveUsers;
