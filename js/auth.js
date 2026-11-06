// Общая логика работы с токенами и запросами к dummyjson
const API = 'https://dummyjson.com';

const Auth = {
  getAccess() {
    return localStorage.getItem('accessToken');
  },
  getRefresh() {
    return localStorage.getItem('refreshToken');
  },
  save(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
  logout() {
    this.clear();
    location.replace('index.html');
  },
};

// Обновление пары токенов по refreshToken (задание со звёздочкой)
async function refreshTokens() {
  const refreshToken = Auth.getRefresh();
  if (!refreshToken) throw new Error('Нет refreshToken');

  const { data } = await axios.post(`${API}/auth/refresh`, {
    refreshToken,
    expiresInMins: 30,
  });
  Auth.save(data.accessToken, data.refreshToken);
  return data.accessToken;
}
