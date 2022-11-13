/* eslint-disable no-console */

import React from 'react';
const useLocalStorage = (
  key: string,
  initialValue?: unknown
): [unknown, (value: unknown) => void] => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(
        `Error trying to get item ${key} from local storage. ${error}`
      );
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      `Error trying to save item ${key} to local storage. ${error}`;
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
