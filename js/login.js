const form = document.querySelector('[data-login-form]');
const statusEl = document.querySelector('[data-login-status]');
const googleButton = document.querySelector('[data-google-login]');

const showStatus = (message, type) => {
  statusEl.textContent = message;
  statusEl.classList.remove('success', 'error');
  if (type) {
    statusEl.classList.add(type);
  }
};

const checkLogin = async (email, password) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!email.endsWith('@gmail.com')) {
    return { ok: false, message: 'Please use a valid Google account (@gmail.com).' };
  }

  if (password.length < 6) {
    return { ok: false, message: 'Password should be at least 6 characters.' };
  }

  return { ok: true, message: 'Login verified. Redirecting to your Racana workspace...' };
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = form.querySelector('[name="email"]').value.trim();
  const password = form.querySelector('[name="password"]').value;

  showStatus('Checking credentials...', '');
  const result = await checkLogin(email, password);
  showStatus(result.message, result.ok ? 'success' : 'error');
});

googleButton.addEventListener('click', async () => {
  showStatus('Connecting to Google...', '');
  await new Promise((resolve) => setTimeout(resolve, 500));
  showStatus('Google sign-in ready. Please complete authentication in the popup.', 'success');
});
