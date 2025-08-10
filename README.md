# FF2 — React + Firebase + OpenAPI (Swagger)

Минимальный шаблон фронтенда на React + Vite (TypeScript) с интеграцией Firebase Auth и генерацией API-клиента из Swagger/OpenAPI.

## Быстрый старт

1) Установите зависимости:

```bash
npm i
```

2) Скопируйте пример окружения и заполните:

```bash
cp env.example .env
```

Ключевые переменные:
- `VITE_API_BASE_URL` — базовый URL вашего бэкенда
- `VITE_SWAGGER_URL` — URL до swagger.json (или /openapi.json)
- блок `VITE_FIREBASE_*` — параметры вашего проекта Firebase

3) Сгенерируйте клиент из OpenAPI:

```bash
SWAGGER_URL=$VITE_SWAGGER_URL npm run gen:api
```

или просто укажите `VITE_SWAGGER_URL` в `.env` и запустите команду без префикса.

4) Запустите проект:

```bash
npm run dev
```

Откройте `http://localhost:5173`.

## Скрипты

- `npm run dev` — dev-сервер
- `npm run build` — сборка
- `npm run preview` — локальный предпросмотр
- `npm run gen:api` — генерация клиента из Swagger/OpenAPI

## Структура

- `src/ui/App.tsx` — пример UI, кнопки входа в Firebase и тест вызова API
- `src/lib/firebase.ts` — инициализация Firebase
- `src/lib/auth.ts` — получение Firebase ID Token и подписка на обновления
- `src/lib/api.ts` — настройка OpenAPI клиента (база URL и токен)
- `src/api` — директория генерируется автоматически

## Примечания

- Для авторизации в API клиент передаёт Firebase ID Token (если пользователь авторизован) как Bearer-токен. При необходимости адаптируйте заголовки в `src/lib/api.ts`.
- Если нет схемы Swagger — UI будет работать, но пример запроса покажет сообщение о необходимости генерации клиента.
