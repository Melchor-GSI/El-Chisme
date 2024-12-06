import { useState } from "react";

export const useToggleState = (value = false) => {
  const [state, setState] = useState(value);

  return [state, () => setState((prev) => !prev)] as const;
};
