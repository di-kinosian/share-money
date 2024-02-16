import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

export const ModalContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleInput = styled(Input)`
  width: 100%;
`;

export const CurrencySelector = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  display: flex;
  align-items: center;
  padding: 9px 14px;
`;

export const CurrencyPlaceholder = styled.span`
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  color: rgba(34, 36, 38, 0.3);
`;

export const Actions = styled.div`
  max-height: 70vh;
  overflow: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Action = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
`;

export const SelectorValue = styled.div`
  display: flex;
  justify-content: space-between;
`;
