const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const contentEl = document.getElementById('content');

document.getElementById('logout-btn').addEventListener('click', () => Auth.logout());

function fetchMe(token) {
  return axios.get(`${API}/auth/me`, {
    headers: { Authorization: 'Bearer ' + token },
  });
}

function render(user) {
  document.getElementById('avatar').src = user.image;
  document.getElementById('full-name').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('email').textContent = user.email;
  document.getElementById('age').textContent = user.age;
  document.getElementById('city').textContent = user.address?.city ?? '—';

  loadingEl.hidden = true;
  contentEl.hidden = false;
}

function showError(message) {
  loadingEl.hidden = true;
  errorEl.textContent = message;
  errorEl.hidden = false;
}

async function loadProfile() {
  const token = Auth.getAccess();
  if (!token) return location.replace('index.html');

  try {
    const { data } = await fetchMe(token);
    render(data);
  } catch (err) {
    if (err.response?.status !== 401) {
      return showError('Не удалось загрузить профиль');
    }

    // 401: пробуем обновить токен по refreshToken
    try {
      const newToken = await refreshTokens();
      const { data } = await fetchMe(newToken);
      render(data);
    } catch {
      // refresh тоже не сработал — выходим
      Auth.logout();
    }
  }
}

loadProfile();
