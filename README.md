# FinBuddy — React-приложение для управления личными финансами

Практическая работа, вариант 9. Приложение демонстрирует набор переиспользуемых React-компонентов для учёта доходов и расходов.

## Запуск на Windows 10

1. Установите Node.js LTS: https://nodejs.org/
2. Распакуйте проект и откройте папку `FinBuddy` в Visual Studio Code.
3. Откройте терминал VS Code (**Терминал → Создать терминал**) и выполните:

```bash
npm install
npm run dev
```

4. Откройте адрес `http://localhost:5173`, который появится в терминале.

Проверка production-сборки:

```bash
npm run build
npm run preview
```

## Реализованные требования

- **React-компоненты:** `Sidebar`, `SearchBar`, `CategoryTabs`, `AddTransactionButton`, `ExpensesChart`, `App`.
- **Props:** данные и обработчики передаются между родительским и дочерними компонентами через props.
- **useState:** хранит транзакции, выбранный раздел, поисковый запрос, месяц, категорию и состояние модального окна.
- **useEffect:** сохраняет массив транзакций в `localStorage` при изменении состояния. При следующем открытии страницы данные восстанавливаются.
- **Обработка событий:** `onClick`, `onChange`, `onSubmit`.
- **Условный рендеринг:** модальное окно отображается только при `open === true`; для пустого результата поиска и отсутствия расходов выводятся отдельные состояния.
- **Списочный рендеринг:** категории, строки транзакций, легенда диаграммы и бюджетные категории создаются через `.map()`.
- **Состояние и взаимодействие:** добавление операции обновляет список и сводные показатели; фильтры и поиск изменяют отображаемые строки; диаграмма пересчитывается по расходам.
- **CSS:** адаптивное оформление находится в `src/styles.css`.
- **GitHub:** инструкции по публикации приведены ниже.

## Структура компонентов

- `src/components/Sidebar.jsx` — боковая навигация с подсветкой активного раздела.
- `src/components/SearchBar.jsx` — поиск по названию/категории и фильтр по месяцу.
- `src/components/CategoryTabs.jsx` — фильтрация по категориям и счётчики операций.
- `src/components/AddTransactionButton.jsx` — модальная форма добавления дохода или расхода.
- `src/components/ExpensesChart.jsx` — круговая диаграмма Recharts.
- `src/App.jsx` — главный компонент, состояние приложения, вычисления и связь компонентов.
- `src/data.js` — демонстрационные данные и цвета категорий.

## Публикация на GitHub

1. Создайте новый пустой репозиторий на https://github.com/new, например `FinBuddy`.
2. В настройках репозитория не добавляйте README, `.gitignore` или лицензию (они уже есть в проекте).
3. В терминале VS Code, находясь в папке проекта, выполните:

```bash
git init
git add .
git commit -m "Initial FinBuddy React application"
git branch -M main
git remote add origin https://github.com/ВАШ-ЛОГИН/FinBuddy.git
git push -u origin main
```

Замените `ВАШ-ЛОГИН` на свой логин GitHub. Если Git запросит авторизацию, войдите в свой аккаунт в открывшемся окне браузера.

После отправки откройте страницу созданного репозитория — исходный код будет опубликован.

> Важно: публикация требует входа в личный аккаунт GitHub. Проект подготовлен к публикации, но сам репозиторий нельзя создать от имени пользователя без его авторизации.


## GitHub Pages deployment

The repository is configured for the project URL `https://domrachev-artem23.github.io/FinBuddy/`.
The workflow `.github/workflows/deploy.yml` builds the Vite app and deploys `dist` to GitHub Pages after every push to `main`.

In the new repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
