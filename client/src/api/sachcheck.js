const API_BASE = 'https://sachcheck-server.onrender.com';

async function post(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Verification failed');
  }

  return data;
}

export const checkText = text =>
  post('/api/check/text', { text });

export const checkImage = imageBase64 =>
  post('/api/check/image', { imageBase64 });