import React from 'react';
import { useState, useMemo, useEffect, useRef } from 'react';
import * as s from './styled';
import arrowIcon from '../../assets/img/arrow-icon.svg';

interface IProps {
  className?: string;
  value: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
}

function Dropdown(props: IProps) {
  const [showing, setShowing] = useState(false);

  const containerRef = useRef(null);

  const showOptions = () => {
    if (showing) {
      setShowing(false);
    } else {
      setShowing(true);
    }
  };

  const closeOptions = () => {
    setShowing(false);
  };

  const selectedOption = useMemo(() => {
    return props.options.find((item) => item.value === props.value);
  }, [props.options, props.value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowing(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const selectOption = (event) => {
    props.onSelect(event.target.dataset.value);
    setShowing(false);
  };

  return (
    <s.DropdownConteiner ref={containerRef}>
      <s.DropdownControl onClick={showOptions} isOpen={showing}>
        {selectedOption ?
          <s.DropdownControlValue>
            {selectedOption.label}
          </s.DropdownControlValue> : props.placeholder}

        <s.ArowIcon
          alt=""
          src={arrowIcon}
          onClick={showOptions}
          style={{
            transform: showing ? 'rotate(90deg)' : 'rotate(270deg)',
          }}
        />
      </s.DropdownControl>

      {showing ? (
        <s.DropdownOptions onClick={closeOptions}>
          {props.options.map((item) => (
            <s.Option
              onClick={selectOption}
              data-value={item.value}
              isActive={item.value === props.value}
            >
              {item.label}
            </s.Option>
          ))}
        </s.DropdownOptions>
      ) : null}
    </s.DropdownConteiner>
  );
}

export default Dropdown;
