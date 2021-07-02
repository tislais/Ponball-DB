import fetch from 'node-fetch';

export default async function ingest(url) {
  const res = await fetch(url);
  return res.text();
}
