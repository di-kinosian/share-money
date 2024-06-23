import { invalid } from 'moment';
import styled from 'styled-components';

export const ModalContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CurrencySelector = styled.div<{ invalid: boolean }>`
  height: 40px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #eaeaec;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-color: ${(props) => {
    return props.invalid ? '#fe7374' : '#eaeaec';
  }};
`;

export const CurrencyPlaceholder = styled.span`
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  color: #a6a7ba;
  font-size: 16px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ActionWrapper = styled.div``;
