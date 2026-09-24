// AI-GENERATED: Qoder
/** Форматирование цены в тенге. */
export function formatPrice(value: string | number): string {
  const num = typeof value === "string" ? Number(value) : value;
  return `${num.toLocaleString("ru-RU")} ₸`;
}
