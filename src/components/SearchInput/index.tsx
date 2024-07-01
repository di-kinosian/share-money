import { Icons } from '@makhynenko/ui-components';
import * as s from './styled';
import { useRef, useState } from 'react';

type SearchInputProps = {
  isTop?: boolean;
  setSearchValue?: (event: any) => void;
  searchValue?: string;
};

export const SearchInput = ({
  isTop,
  setSearchValue,
  searchValue,
}: SearchInputProps) => {
  const ref = useRef<HTMLInputElement>();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    if (ref.current && !isSearchOpen) {
      ref.current.focus();
    }
  };

  const handleCloseSearchClick = () => {
    setIsSearchOpen(false);
    setSearchValue('');
  };

  const handleSearchBlur = (e) => {
    if (e.target.value.length === 0) {
      setIsSearchOpen(false);
      setSearchValue('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <s.SearchWrapper
      onClick={handleSearchClick}
      $isSearchOpen={isSearchOpen}
      $isTop={isTop}
    >
      <s.SearchInput
        value={searchValue}
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
        onBlur={handleSearchBlur}
        ref={ref}
      />
      {isSearchOpen ? (
        <Icons name="cross" size={20} onClick={handleCloseSearchClick} />
      ) : (
        <Icons name="search" size={20} />
      )}
    </s.SearchWrapper>
  );
};
