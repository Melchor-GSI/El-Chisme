export function formatToCurrency(
  amount: number | null = 0,
  locale: string = "en-US",
  currency: string = "USD"
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount!
  );
}
