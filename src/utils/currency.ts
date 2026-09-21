export const currencyFormatter = new Intl.NumberFormat('es-EC', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) => currencyFormatter.format(value);
