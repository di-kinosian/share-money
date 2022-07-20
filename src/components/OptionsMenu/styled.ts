import styled from 'styled-components';

export const DropdownOptions = styled.div`
    position: absolute;
    z-index: 1;
    top: 38px;
    width: 100%;
    background: #fff;
    border: 1px solid rgb(169, 169, 169);
    border-radius: 4px;
    align-items: center;
    border-color: #85b7d9;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const Option = styled.div`
    padding: 0 6px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: '#FFF';
    &:hover {
        background:rgba(0, 0, 0, 0.05);
    }
    &:last-child {
        border-radius: 0 0 4px 4px;
    }
`;

export const Title = styled.div`
    font-weight: bold;
    padding: 0 6px;
    line-height: 40px;
    height: 40px;
`

