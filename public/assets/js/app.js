const userNameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const signUpBtn = document.getElementById('signUpBtn');

signUpBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const username = userNameInput.value;
  const password = passwordInput.value;

  if (username.trim().length === 0) {
    alert('Please enter a valid username');
    return;
  }

  if (password.trim().length < 6) {
    alert('Password must be at least 6 characters long');
  }

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    });

    await response.json();
    window.location.href = '/todos';
  } catch (error) {
    alert(error);
  }


});