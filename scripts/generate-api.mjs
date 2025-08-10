#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync, rmSync } from 'node:fs';
import { generate } from 'openapi-typescript-codegen';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = resolve(__dirname, '..');
const swaggerUrl = process.env.SWAGGER_URL || process.env.npm_config_SWAGGER_URL || process.env.VITE_SWAGGER_URL || '';
const outDir = resolve(projectRoot, 'src/api');

if (!swaggerUrl) {
  console.error('Не задан SWAGGER_URL. Укажите переменную окружения или .env значение VITE_SWAGGER_URL.');
  process.exit(0);
}

if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
}

console.log(`Генерация OpenAPI клиента из: ${swaggerUrl}`);

await generate({
  input: swaggerUrl,
  output: outDir,
  httpClient: 'axios',
  useUnionTypes: true,
  exportCore: true,
  exportServices: true,
  exportModels: true,
  clientName: 'ApiClient',
  hooks: {
    onCreateFile: (file) => {
      // no-op; keep defaults
    }
  }
});

console.log('Готово: src/api обновлён');


