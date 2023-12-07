import styled from 'styled-components';
import { ShadowContainer } from '../../components/styled';

export const PageContent = styled.div`
`;

export const ShareContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  svg {
    align-self: center;
  }
`;

export const JoinButton = styled.div`
    background: rgb(105, 226, 212);
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    padding: 8px 24px;
    cursor: pointer;
    max-width: 350px;
    margin: 0 auto;
    font-weight: bold;
`;

export const AddNewTransaction = styled(ShadowContainer)`
    display: flex;
    align-items: center;
    margin: 0 16px;
    span {
        margin-left: 8px;
        font-weight: 600;
        line-height: 16px;
        font-size: 16px;
    }
    i.icon {
        font-size: 16px;
    }
`;

export const TracsactionOptions = styled(ShadowContainer)`
    margin: 0 16px;
`;

export const CaseTransaction = styled.div`
    font-size: 16px;
    font-weight: 600;
    &:first-child {
        margin-bottom: 8px;
    }
    .icons {
        width: 25px;
        font-size: 16px;
        line-height: 16px;
    }
`;

export const Actions = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Action = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
`