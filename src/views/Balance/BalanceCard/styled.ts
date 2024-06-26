import styled from 'styled-components';

export const BalanceBlock = styled.div`
  background: rgb(105, 226, 212);
  color: #fff;
  padding: 16px;
`;

export const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BalanceInfo = styled.div`
  margin-right: auto;
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconInfo = styled.div``;
export const IconEllipsis = styled.div`
  padding-top: 2px;
`;

export const BalanceLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const BalanceAmount = styled.div`
  font-size: 37px;
  font-weight: 700;
  line-height: 37px;
  &.positive {
    color: #fff;
  }
  &.negative {
    color: red;
  }
`;
