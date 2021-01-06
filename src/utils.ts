export function getURLParam(name: string) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name) || '';
}

export function getHashCode(s: string): number {
  if (!s) return 0;
  return s.split('')
    .reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}