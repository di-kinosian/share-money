import * as s from './styled';
import { CSSProperties, FC } from 'react';

interface IProps {
    className?: string;
    style?: CSSProperties;
    label: string;
}

const Field: FC<IProps> = (props) => {
    return (
        <s.FieldContainer style={props.style} className={props.className}>
            <s.FileldLabel>{props.label}</s.FileldLabel>
            {props.children}
        </s.FieldContainer>
    );
};

export default Field;
