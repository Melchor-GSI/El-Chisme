import { useCurrencies } from "@/hooks/useCurrencies";
import { Currency } from "@/types/currency";
import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CurrencySelect = (props: SelectProps) => {
  const { currencies } = useCurrencies();

  return (
    <Select defaultValue={String(Currency.CUP)} {...props}>
      <SelectTrigger className="w-20">
        <SelectValue placeholder="Seleccionar categoria" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {currencies.map((currency) => (
            <SelectItem key={currency.id} value={String(currency.id)}>
              {currency.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
