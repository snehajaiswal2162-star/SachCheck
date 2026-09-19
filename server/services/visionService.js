import { GoogleGenerativeAI } from '@google/generative-ai';

export async function extractTextFromImage(imageBase64) {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not configured');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-3.5-flash' });
  const clean = imageBase64.replace(/^data:image\/[^;]+;base64,/, '');
  let lastError;
  const prompt = 'Extract the complete readable text from this forwarded-message screenshot. Ignore UI buttons and app chrome. Return ONLY valid JSON: {"text":"string"}';
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const suffix = attempt ? '\nYour last response was not valid JSON. Return ONLY the JSON object, nothing else.' : '';
      const result = await model.generateContent([{ text: prompt + suffix }, { inlineData: { mimeType: 'image/jpeg', data: clean } }]);
      const raw = result.response.text().trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
      const parsed = JSON.parse(raw);
      if (!parsed.text) throw new Error('No text extracted from image');
      return parsed.text;
    } catch (error) { lastError = error; }
  }
  throw new Error(`Vision JSON response failed after retry: ${lastError?.message || 'unknown error'}`);
}
