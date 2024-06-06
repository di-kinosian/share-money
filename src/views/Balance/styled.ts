import styled from 'styled-components';
import { BodyText } from '../../components/styled';

export const PageContent = styled.div``;

export const ShareContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  svg {
    align-self: center;
  }
`;

export const Actions = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Action = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export const GoHomeButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 8px;
`;

export const BalanceInfo = styled.div``;
export const UserBalance = styled.div``;

export const ModalContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InviteContent = styled(ModalContent)`
  svg {
    align-self: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ErrorText = styled(BodyText)`
  color: red;
`;

