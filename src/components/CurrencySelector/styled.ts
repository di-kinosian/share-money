import styled from 'styled-components';

export const CurrencySelector = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  display: flex;
  align-items: center;
  padding: 9px 14px;
`;

export const SelectorValue = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CurrencyPlaceholder = styled.span`
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  color: rgba(34, 36, 38, 0.3);
`;
