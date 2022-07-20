import React, { useRef } from 'react';
import { useState } from 'react';
import * as s from './styled';
import { Icon } from 'semantic-ui-react';

interface IProps {
    id: string;
    type: 'spent' | 'paid'
    onSelect: (id: string, type: string, value: string) => void;
}

interface IOption {
    value: string;
    label: string;
}

const options: IOption[] = [
    {
        value: '100%',
        label: '100%',
    },
    {
        value: '50%',
        label: '50%',
    },
    {
        value: '0%',
        label: '0%',
    },
    {
        value: 'Rest',
        label: 'Rest',
    },
];

function AmountMenu(props: IProps) {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = (value: string) => {
        props.onSelect(props.id, props.type, value)
    };

    return (
        <s.Container onClick={() => setIsOpen(true)} ref={ref}>
            <Icon name="ellipsis vertical" />
            {isOpen && (
                <s.Menu
                    options={options}
                    parentRef={ref}
                    onClose={() => setIsOpen(false)}
                    onSelect={handleSelect}
                    title="% of Amount"
                />
            )}
        </s.Container>
    );
}

export default AmountMenu;
