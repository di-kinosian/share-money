import styled from 'styled-components';

export const DropdownConteiner = styled.div`
    position: relative;
    font-family: sans-serif;
    font-size: 16px;
`;

export const DropdownControl = styled.div<{ isOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: sans-serif;
    font-size: 100%;
    height: 40px;
    padding: 0 6px;
    font-size: 16px;
    background-color: #ffff;
    border: 1px solid;
    width: 100%;
    overflow: hidden;
    border-color: ${(props) => {
        return props.isOpen ? '#85b7d9' : 'rgb(169, 169, 169)';
    }}; ;

    border-radius: ${(props) => {
        return props.isOpen ? '4px 4px 0 0' : '4px';
    }};
`;

export const DropdownControlValue = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DropdownOptions = styled.div`
    position: absolute;
    z-index: 1;
    top: 38px;
    width: 100%;
    background: #fff;
    border-left: 1px solid rgb(169, 169, 169);
    border-right: 1px solid rgb(169, 169, 169);
    border-bottom: 1px solid rgb(169, 169, 169);
    border-radius: 0 0 4px 4px;
    align-items: center;
    border-color: #85b7d9;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const Option = styled.div<{ isActive: boolean }>`
    padding: 0 6px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: ${(props) => {
        return props.isActive ? 'rgba(0,0,0,.03)' : '#FFF';
    }};
    font-weight: ${(props) => {
        return props.isActive ? 'bold' : 'normal';
    }};
    &:hover {
        background: ${(props) => {
            return props.isActive ? 'rgba(0,0,0,.03)' : 'rgba(0, 0, 0, 0.05)';
        }};
    }
    &:last-child {
        border-radius: 0 0 4px 4px;
    }
`;

export const ArowIcon = styled.img`
    width: 24px;
    cursor: pointer;
    transform: rotate(-90deg);
`;
