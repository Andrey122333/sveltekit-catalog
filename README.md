# SvelteKit Каталог "Код и Кофе"

Интернет-магазин товаров для разработчиков на SvelteKit 2.60 со Svelte 5 runes.

## Технологии

- **SvelteKit:** 2.60.1
- **Svelte:** 5.55.7 (с runes)
- **TypeScript:** 6.0.3
- **Vite:** 8.0.13
- **@sveltejs/adapter-node:** 5.5.4
- **@sveltejs/vite-plugin-svelte:** 7.1.2
- **Adapter Node** для production

## Docker

```bash
docker build -t sveltekit-catalog .
docker run -p 3000:3000 sveltekit-catalog
```
Приложение будет доступно по адресу: http://localhost:3000

## Структура проекта

```
sveltekit-catalog/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Filters.svelte      # Панель фильтров
│   │   │   ├── Footer.svelte       # Подвал
│   │   │   ├── Header.svelte       # Шапка с корзиной
│   │   │   ├── ProductCard.svelte  # Карточка товара
│   │   │   └── Sort.svelte         # Сортировка
│   │   ├── stores/
│   │   │   └── cart.svelte.ts      # Корзина ($state class)
│   │   ├── products.ts             # Утилиты и фильтрация товаров
│   │   └── types.ts                # TypeScript типы
│   ├── routes/
│   │   ├── catalog/
│   │   │   ├── +page.server.ts     # Загрузка данных на сервере
│   │   │   ├── +page.svelte        # Страница каталога
│   │   │   └── [id]/
│   │   │       ├── +page.server.ts # Загрузка товара по id
│   │   │       └── +page.svelte    # Детальная страница товара
│   │   ├── +layout.svelte          # Корневой layout
│   │   └── +page.ts                # Редирект на /catalog
│   ├── data/
│   │   └── products.json           # База товаров
│   ├── app.css                     # Глобальные стили
│   └── app.html                    # HTML шаблон
├── svelte.config.js
├── vite.config.ts
└── tsconfig.json
```

## Настройка переменных и обновление репозитория

Для корректной работы автоматизированного процесса сборки и развертывания необходимо добавить переменные в репозиторий GitHub и выполнить обновление проекта.

### Добавление переменных репозитория

В интерфейсе GitHub открыть:

```
Settings → Actions secrets and variables → Variables
```

Добавить две переменные:

- **REGISTRY** — адрес контейнерного реестра (например, `ghcr.io`)
- **IMAGE_NAME** — имя Docker‑образа, используемое в процессе сборки

Эти параметры позволяют workflow корректно формировать и публиковать контейнер приложения.

---

### Обновление репозитория

После добавления переменных необходимо зафиксировать изменения в проекте и отправить их в основную ветку:

```bash
git add .
git commit -m "Добавлены переменные для CI/CD"
git push origin main
```

После отправки изменений GitHub автоматически запускает настроенный workflow, который выполняет сборку и публикацию образа, а также обновляет развернутое приложение.
