import React, { useCallback, useMemo, useState } from 'react';
import * as s from './styled';

interface AutocompleteProps {
  options?: string[];
  placeholder?: string;
  error?: boolean;
  onChange: (value: string) => void;
  value: string;
}
export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  placeholder,
  error,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const filteredSuggestions = useMemo(
    () =>
      options
        ?.filter((title) => title.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5),
    [options, value]
  );

  const selectOption = useCallback(
    (title: string) => () => onChange(title),
    [onChange]
  );

  const onBlur = useCallback(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  }, []);

  const onFocus = useCallback(() => setIsOpen(true), []);

  return (
    <s.AutocompleteContainer>
      <s.TracsactionInput
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        error={error}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {isOpen && value && filteredSuggestions.length > 0 && (
        <s.SuggestionsList>
          {filteredSuggestions?.map((title, index) => (
            <s.SuggestionItem key={index} onClick={selectOption(title)}>
              {title}
            </s.SuggestionItem>
          ))}
        </s.SuggestionsList>
      )}
    </s.AutocompleteContainer>
  );
};

export default Autocomplete;
