const API_URL = 'https://formspree.io/f/xeelgjal';

const form = document.getElementById('recruiting-form');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusEl.textContent = 'Sending report...';
  statusEl.className = '';
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Server returned ' + response.status);
    }

    statusEl.textContent = 'Report submitted successfully.';
    statusEl.className = 'success';
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Failed to send report. Please try again.';
    statusEl.className = 'error';
  } finally {
    submitBtn.disabled = false;
  }
});
