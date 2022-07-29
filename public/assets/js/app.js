const userNameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const signUpBtn = document.getElementById('signUpBtn');
const logoutBtn = document.getElementById('logoutBtn');








logoutBtn?.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/signout', {
      method: 'POST'
    });

    await res.json();
    window.location.href = '/';
  } catch (error) {
    console.log(error);
    alert(error);
  }
});
















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