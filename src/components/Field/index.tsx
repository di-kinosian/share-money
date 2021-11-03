import * as s from './styled';
import { FC } from 'react';

interface IProps {
    className?: string;
    label: string;
}

const Field: FC<IProps> = (props) => {
    return (
        <s.FieldContainer className={props.className}>
            <s.FileldLabel>{props.label}</s.FileldLabel>
            {props.children}
        </s.FieldContainer>
    );
};

export default Field;
