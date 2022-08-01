import { FC } from 'react';
import { memo } from 'react';
import * as s from './styled';

interface IProps {
    offset: number;
    width: number;
    isActive: boolean;
    label: string;
}

const Day: FC<IProps> = memo((props) => {
    return (
        <s.Day
            style={{
                position: 'absolute',
                left: props.offset,
                width: props.width,
                background: props.isActive ? 'rgb(230, 233, 255)' : '',
            }}
        >
            <s.DayLabel>{props.label}</s.DayLabel>
        </s.Day>
    );
})

export default Day