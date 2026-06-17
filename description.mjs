export async function fetchDescription(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text.trim();
}
