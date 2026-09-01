'use client';

import { useState } from 'react';

export function useToggle(initialState = false) {
  const [value, setValue] = useState(initialState);

  const toggle = () => setValue((prev) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const set = (v: boolean) => setValue(v);

  return { value, toggle, setTrue, setFalse, set };
}
