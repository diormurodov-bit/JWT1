# Homework #40 — JWT авторизация

Сервер: https://dummyjson.com. Тестовый аккаунт: `emilys / emilyspass`.

## Запуск
Откройте `index.html` в браузере (или через Live Server в VS Code).

## Структура
- `index.html` / `js/login.js` — страница входа с валидацией и блокировкой кнопки
- `profile.html` / `js/profile.js` — защищённая страница профиля
- `js/auth.js` — работа с localStorage, выход, обновление токена (refresh)
- `css/style.css` — стили

## Проверка выхода по 401
1. Войдите в систему.
2. Откройте DevTools → Application → Local Storage.
3. Испортите `accessToken` и `refreshToken` (например, допишите символ `x` в конец).
4. Обновите страницу `profile.html` — должен сработать выход на `index.html`.

Важно: если испортить только `accessToken`, сработает refresh и сессия восстановится. Это ожидаемое поведение задания со звёздочкой.
