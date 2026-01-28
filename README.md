# SvelteKit Каталог "Код и Кофе"

Интернет-магазин товаров для разработчиков на SvelteKit 2.5 со Svelte 5 runes.

## Технологии

- **SvelteKit:** 2.5.0
- **Svelte:** 5.0.0 (с runes)
- **TypeScript:** 5.3.3
- **Vite:** 5.0.11
- **Adapter Node** для production

## Установка

```bash
npm install
```

## Разработка

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3011

## Production сборка

```bash
npm run build
npm start
```

Или вручную:
```bash
PORT=3011 node build
```

## Docker

```bash
docker build -t sveltekit-catalog .
docker run -p 3011:3011 sveltekit-catalog
```

## Структура проекта

```
sveltekit-catalog/
├── src/
│   ├── lib/
│   │   ├── components/         # Компоненты
│   │   ├── stores/             # Svelte 5 stores
│   │   ├── types.ts
│   │   └── products.ts
│   ├── routes/
│   │   ├── catalog/
│   │   │   ├── +page.svelte
│   │   │   ├── +page.server.ts
│   │   │   └── [id]/
│   │   ├── +layout.svelte
│   │   └── +page.ts
│   ├── data/
│   │   └── products.json
│   └── app.html
└── svelte.config.js
```

## Svelte 5 Runes

Проект использует новые Svelte 5 runes для реактивности:

- `$state` — для реактивного состояния
- `$derived` — для вычисляемых значений
- `$props` — для пропсов компонентов

### Пример (корзина):

```typescript
class CartStore {
  items = $state<CartItem[]>([]);

  get total() {
    return this.items.reduce(...);
  }

  addItem(id, name, price) {
    // ...
  }
}
```

## Особенности

- **SSR** через load functions
- **Клиентская корзина** с LocalStorage
- **Scoped CSS** в компонентах
- **Type-safe** routing с generated types

