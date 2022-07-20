import React from 'react';
import { useEffect } from 'react';
import * as s from './styled';

interface IProps {
    className?: string;
    onSelect: (value: string) => void;
    onClose: () => void;
    options: {
        value: string;
        label: string;
    }[];
    parentRef: React.MutableRefObject<any>;
    title?: string;
}

function OptionsMenu(props: IProps) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                props.parentRef.current &&
                !props.parentRef.current.contains(event.target)
            ) {
                props.onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOption = (event) => {
        props.onSelect(event.target.dataset.value);
    };

    return (
        <s.DropdownOptions className={props.className}>
            {props.title && <s.Title>{props.title}</s.Title>}
            {props.options.map((item) => (
                <s.Option onClick={selectOption} data-value={item.value}>
                    {item.label}
                </s.Option>
            ))}
        </s.DropdownOptions>
    );
}

export default OptionsMenu;
