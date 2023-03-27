import React, { useCallback, useEffect, useState } from "react";

export const useAutocomplete = <T extends {}>(
  fetcher: (searchText: string) => Promise<T[]>,
  handleSelection: (selectedItem: T) => void
) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [selectedSuggIndex, setSelectedSuggIndex] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const resetSuggestions = () => {
    setValue('');
    setSuggestions([]);
    setSelectedSuggIndex(0);
    setShowSuggestions(false);
  }

  useEffect(() => {
    if (value) {
      fetcher(value).then(data => {
        setSuggestions(data);
        setShowSuggestions(true);
      });
    } else {
      setShowSuggestions(false);
    }
  }, [value, fetcher])

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, [setValue]);

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        if (suggestions.length > 0) {
          const suggestion = suggestions[selectedSuggIndex];
          handleSelection(suggestion);
        }
        resetSuggestions();
      } else if (e.key === 'ArrowUp') {
        setSelectedSuggIndex((prevIndex) => {
          return prevIndex === 0
            ? suggestions.length - 1
            : prevIndex - 1;
        });
      } else if (e.key === 'ArrowDown') {
        setSelectedSuggIndex(prevIndex => {
          return prevIndex === suggestions.length
            ? 0
            : prevIndex + 1;
        });
      } else if (e.key === 'Escape') {
        resetSuggestions();
      }
    }, [suggestions, selectedSuggIndex]);

  return {
    value,
    suggestions,
    selectedSuggestionIndex: selectedSuggIndex,
    showSuggestions,
    onChange: handleOnChange,
    onKeyDown: handleOnKeyDown,
  };
};
