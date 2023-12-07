import styled from 'styled-components';
import { DateTimeInput as _DateTimeInput } from 'semantic-ui-calendar-react';
import { BodyText } from '../../../components/styled';
import { Icon } from 'semantic-ui-react';

export const Buttons = styled.div`
  button {
    width: 100%;
  }
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

export const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Link = styled(BodyText)`
	color: #1a8a7d;
	text-decoration: underline;
`

export const Ellipsis = styled(Icon).attrs(props => ({ ...props, name: 'ellipsis vertical' }))`
  &.icon {
    height: initial;
    margin: 0;
  }
`

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