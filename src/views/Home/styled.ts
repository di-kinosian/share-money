import styled from 'styled-components';

export const ContainerHomePage = styled.div`
  padding: 16px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 64px;
`;

export const PageTitle = styled.div`
  width: fit-content;
  margin: 0 auto;
  font-weight: 800;
  border-bottom: 1px solid gray;
  font-size: 19px;
  margin-bottom: 24px;
`;

export const Balance = styled.div`
  width: 100%;
  height: 52px;
  padding: 16px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #d8d8d8;
  flex-shrink: 0;
`;

export const EmptyBalancesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
