import styled from 'styled-components';

export const SearchWrapper = styled.div<{
  $isSearchOpen: boolean;
  $isTop: boolean;
}>`
  margin: 8px 0;
  position: absolute;
  right: 16px;
  top: 5;
  top: ${(props) => (props.$isTop ? 5 : 0)};
  height: 32px;
  line-height: 42px;
  display: flex;
  align-items: center;
  z-index: 2;
  justify-content: space-between;
  width: ${(props) => (props.$isSearchOpen ? '142px' : '40px')};
  border: ${(props) =>
    props.$isSearchOpen ? '1px solid #d8d8d8' : '1px solid white'};
  border-radius: 4px;
  overflow: hidden;
  transition: 500ms width ease-in-out, 500ms border ease-in-out;

  svg {
    flex-shrink: 0;
    margin-right: 2px;
  }
`;

export const SearchInput = styled.input`
  border: none;
  padding: 4px 8px;
  font-family: sans-serif;
  outline: none;
`;
