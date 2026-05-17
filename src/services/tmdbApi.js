import { API_BASE } from '../config/api.js';

const fetchCache = new Map();
const CACHE_TTL = 10 * 60 * 1000;

export const tmdbFetch = async (url, apiKey) => {
  const cached = fetchCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'accept': 'application/json'
    }
  });
  const data = await res.json();
  if (data.status_code) throw new Error(data.status_message || 'API Error');
  fetchCache.set(url, { data, timestamp: Date.now() });
  return data;
};

export const fetchMultiplePages = async (endpoint, pageCount, apiKey) => {
  const requests = Array.from({ length: pageCount }, (_, i) =>
    tmdbFetch(`${endpoint}&page=${i + 1}`, apiKey)
  );
  const responses = await Promise.all(requests);
  return responses.flatMap(r => r.results || []);
};

export const fetchWithCredits = async (id, mediaType, apiKey, language) => {
  const endpoint = mediaType === 'movie' ? 'movie' : 'tv';
  const res = await tmdbFetch(`${API_BASE}/${endpoint}/${id}?language=${language}&append_to_response=credits,watch/providers`, apiKey);
  if (!res || res.status_code) return null;
  return res;
};
