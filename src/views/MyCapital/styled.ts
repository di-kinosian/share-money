import styled from 'styled-components';

export const Tabs = styled.div`
  height: 48px;
  display: flex;
  padding: 0 16px;
`;

export const Tab = styled.div`
  display: flex;
  height: 48px;
  width: fit-content;
  padding: 0 16px;
  align-items: center;
  position: relative;

  &.active:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0px;
    right: 0px;
    border-bottom: 2px solid rgb(105, 226, 212);
  }
`;
