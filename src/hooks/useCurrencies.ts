import { Currency } from "@/types/currency";
import { useMemo } from "react";

export const useCurrencies = () => {
  const currencies = useMemo(
    () => [
      { id: Currency.CUP, name: "CUP" },
      { id: Currency.MLC, name: "MLC" },
      { id: Currency.USD, name: "USD" },
    ],
    []
  );

  return { currencies };
};
