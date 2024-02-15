import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

export const AddButton = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  box-shadow: 1px 1px 9px rgb(34 60 80 / 40%);
  border-radius: 100%;
`;

export const ModalContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  font-size: 24px;
  margin: 24px 0;
  font-weight: bold;
`;

export const TitleInput = styled(Input)`
  width: 100%;
`;

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

export const ModalButton = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
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

export const BalanceName = styled.div`
  font-weight: 600;
`;

export const EmptyBalancesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

export const SpentContainer = styled.div`
  position: relative;
`;

export const HalfSpentButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
