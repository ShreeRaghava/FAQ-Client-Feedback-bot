import fetch from 'node-fetch';

async function testFaq() {
  const res = await fetch('http://localhost:8080/faq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: 'What is your refund policy?' })
  });
  console.log('FAQ status', res.status, await res.json());
}

async function testFeedback() {
  const res = await fetch('http://localhost:8080/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test User', email: 'test@example.com', rating: 5, comments: 'Great service' })
  });
  console.log('Feedback status', res.status, await res.json());

  const list = await fetch('http://localhost:8080/feedbacks');
  console.log('Feedbacks', await list.json());
}

(async () => {
  try {
    await testFaq();
    await testFeedback();
  } catch (e) {
    console.error('Error during local tests', e);
  }
})();
