export function mapObject<T>(obj: T, fn: (a: T[keyof T]) => T[keyof T]): T {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    acc[k as keyof T] = fn(v);
    return acc;
  }, {} as T);
}

export function round(num: number, decimalPlaces = 0) {
  const base = Math.pow(10, decimalPlaces);
  return Math.round(num * base) / base;
}

export function isAfterHours() {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 0 && hours < 6;
}
