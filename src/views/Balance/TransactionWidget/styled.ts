import { Step as so } from 'semantic-ui-react';
import styled from 'styled-components';
import { DateTimeInput as _DateTimeInput} from 'semantic-ui-calendar-react';


export const StyledStep = styled(so)`
    padding: 8px!important;
`

export const Buttons = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
`

export const Content = styled.div`
    font-size: 16px;
`

export const Title = styled.div`
    font-weight: bold;
`

export const RadioRow = styled.div`
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 24px 23px 1fr;
    .checkbox {
        top: 1px; // костыль
    }
`

export const RadioLabel = styled.span`
    margin-left: 6px;
`

export const DateTimeInput = styled(_DateTimeInput)`
    width: 100%;
`