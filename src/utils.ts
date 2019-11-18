export function getURLParam(name: string) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name) || '';
}
