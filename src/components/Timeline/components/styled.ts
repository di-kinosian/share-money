
import styled from 'styled-components';

export const Day = styled.div`
    height: 100%;
    background-color: rgb(250, 251, 255);
    border-bottom: 1px solid rgb(111, 134, 175);

    &:nth-child(odd) {
        background-color: rgb(240, 240, 255);
    }
`;

export const DayLabel = styled.div`
    margin: 8px;
    letter-spacing: .1rem;
    font-weight: bold;
`
