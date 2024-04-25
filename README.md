# Vue 3 + Vite

# api.json, который был предоставлен в тестовом задании, развернут на json сервере, для того, чтобы задача была максимально приближена к реальности.
Для запуска json-сервера пользуйтесь в терминале командой: json-server --watch data/api.json --port 3000
Данная команда запустит json сервер на порту 3000
Откроются два эндпойнта: 
Endpoints:
http://localhost:3000/results
http://localhost:3000/info
Наши данные пользователей находятся тут -> http://localhost:3000/results

# Лицевая
Для установки node modules воспользуйтесь командой: yarn install / npm install
После установки в другом терминале запустите проект командой: yarn dev / npm run dev
команда запустит проект на порту 5173

# Важно
Оба терминала запустите параллельно друг с другом, чтобы запрос на получение данных с json-server был успешным

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.


