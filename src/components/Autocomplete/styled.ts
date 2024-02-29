import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

export const AutocompleteContainer = styled.div`
  position: relative;
`;

export const TracsactionInput = styled(Input)`
  width: 100%;
  position: relative;
  &.ui.input > input {
    padding-left: 8px;
    font-size: 16px;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
