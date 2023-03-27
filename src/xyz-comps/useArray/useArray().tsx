
import { useState, useCallback } from 'react'

type UseArrayActions<T> = {
  push: (item: T) => void,
  removeByIndex: (index: number) => void
}

export function useArray<T>(initialValue: T[]): { value: T[] } & UseArrayActions<T> {
  const [array, setArray] = useState<T[]>(initialValue || []);

  const doPush = useCallback((item: T) => {
    setArray([...array, item]);
  }, []);

  const doRemoveByIndex = useCallback((index: number) => {
    if (index >= 0 && index < array.length) {
      const copy = array.slice();
      copy.splice(index, 1);
      setArray(copy);
    }
  }, []);

  return {
    value: array,
    push: doPush,
    removeByIndex: doRemoveByIndex
  };
}
