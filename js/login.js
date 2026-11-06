const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const formError = document.getElementById('form-error');

// Уже вошёл — сразу на профиль
if (Auth.getAccess()) {
  location.replace('profile.html');
}

function setFieldError(input, message) {
  document.getElementById(input.id + '-error').textContent = message;
  input.classList.toggle('invalid', Boolean(message));
}

function validate() {
  setFieldError(usernameInput, '');
  setFieldError(passwordInput, '');
  formError.textContent = '';

  let valid = true;
  if (!usernameInput.value.trim()) {
    setFieldError(usernameInput, 'Введите логин');
    valid = false;
  }
  if (!passwordInput.value) {
    setFieldError(passwordInput, 'Введите пароль');
    valid = false;
  }
  return valid;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!validate()) return; // запрос не отправляем

  submitBtn.disabled = true;
  submitBtn.textContent = 'Вход...';

  try {
    const { data } = await axios.post(`${API}/auth/login`, {
      username: usernameInput.value.trim(),
      password: passwordInput.value,
    });

    Auth.save(data.accessToken, data.refreshToken);
    location.href = 'profile.html';
  } catch (err) {
    const status = err.response?.status;
    formError.textContent =
      status === 400 || status === 401
        ? 'Неверный логин или пароль'
        : 'Ошибка сети. Попробуйте позже';

    submitBtn.disabled = false;
    submitBtn.textContent = 'Войти';
  }
});
