#!/usr/bin/env node
import { execSync } from 'node:child_process';

try {
  if (process.env.SWAGGER_URL || process.env.VITE_SWAGGER_URL) {
    console.log('postinstall: обнаружен SWAGGER_URL — запускаю генерацию клиента');
    execSync('node ./scripts/generate-api.mjs', { stdio: 'inherit' });
  }
} catch (e) {
  console.warn('postinstall: генерация клиента OpenAPI завершилась с ошибкой (можно проигнорировать в dev)', e?.message);
}


