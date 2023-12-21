import styled from 'styled-components';
import { BodyText } from '../../../components/styled';
import { Icon } from 'semantic-ui-react';

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

export const SpentContainer = styled.div`
  position: relative;
`

export const HalfSpentButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`