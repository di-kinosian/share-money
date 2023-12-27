import styled from 'styled-components';
import { Input as _Input } from 'semantic-ui-react';

export const PageContent = styled.div`
  padding: 16px;
`;

export const Input = styled(_Input)`
  width: 100%;
  
  &.ui.input>input {
    padding-left: 8px;
    font-size: 16px;
  }
`;