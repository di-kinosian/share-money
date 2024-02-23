import styled from 'styled-components';

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
  width: 100%;
  padding: 6px 16px;
`;
