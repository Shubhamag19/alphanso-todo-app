export function debounce(fn: Function, wait: number) {
  let timer: NodeJS.Timeout | undefined;

  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
