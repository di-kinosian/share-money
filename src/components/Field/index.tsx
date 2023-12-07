import * as s from './styled';
import { CSSProperties, FC } from 'react';

interface IProps {
  className?: string;
  style?: CSSProperties;
  label: string;
  error?: string;
}

const Field: FC<IProps> = (props) => {
  return (
    <s.FieldContainer style={props.style} className={props.className}>
      {props.label && <s.FileldLabel>{props.label}</s.FileldLabel>}
      {props.children}
      {props.error && <s.FileldError>{props.error}</s.FileldError>}
    </s.FieldContainer>
  );
};

export default Field;
