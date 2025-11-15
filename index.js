import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const feedbackStore = [];

app.post('/faq', (req, res) => {
  const { question } = req.body || {};
  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ status: 'error', error_code: 'INVALID_INPUT', error_message: 'Missing question' });
  }

  const q = question.toLowerCase();
  let answer = "Sorry, I don't have an answer for that right now.";

  if (q.includes('shipping') || q.includes('deliver')) {
    answer = "Typical delivery time is 5-7 business days. For premium shipping, it's 1-3 business days.";
  } else if (q.includes('refund') || q.includes('return')) {
    answer = "You can request a refund within 14 days of delivery. Visit our returns page or reply 'start return' to begin.";
  } else if (q.includes('payment') || q.includes('pay')) {
    answer = "We accept major credit cards, UPI, and netbanking. No payment is accepted via chat.";
  } else if (q.includes('track') || q.includes('tracking')) {
    answer = "To track your order, provide your order ID (e.g., ORD-12345) and we'll check the status.";
  } else if (q.includes('contact') || q.includes('support')) {
    answer = "You can reach our support at support@example.com or reply 'speak to a manager' and we'll connect you.";
  } else {
    answer = "Thanks for your question. Our support team will review and respond within 24 hours.";
  }

  return res.json({
    status: 'ok',
    answer,
    source: 'mock-faq-v1'
  });
});

app.post('/feedback', (req, res) => {
  const { name, email, rating, comments } = req.body || {};
  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ status: 'error', error_code: 'INVALID_RATING', error_message: 'Rating must be a number between 1 and 5' });
  }

  const entry = {
    id: `fb_${Date.now()}`,
    name: name || null,
    email: email || null,
    rating,
    comments: comments || null,
    timestamp: new Date().toISOString()
  };
  feedbackStore.push(entry);

  return res.json({ status: 'ok', message: 'Thank you for your feedback', entry_id: entry.id });
});

app.get('/feedbacks', (req, res) => {
  return res.json({ status: 'ok', count: feedbackStore.length, feedbacks: feedbackStore });
});

export const appFunction = app;
export default app;
