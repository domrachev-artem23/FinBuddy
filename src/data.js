export const initialTransactions = [
  { id: 1, date: '2026-10-28', title: 'Перекрёсток', category: 'Продукты', amount: 2450, type: 'expense' },
  { id: 2, date: '2026-10-27', title: 'Зарплата', category: 'Зарплата', amount: 85000, type: 'income' },
  { id: 3, date: '2026-10-26', title: 'Яндекс Go', category: 'Транспорт', amount: 320, type: 'expense' },
  { id: 4, date: '2026-10-25', title: 'Подписка Netflix', category: 'Развлечения', amount: 799, type: 'expense' },
  { id: 5, date: '2026-10-24', title: 'Аптека Ригла', category: 'Здоровье', amount: 1200, type: 'expense' },
  { id: 6, date: '2026-10-22', title: 'Покупка одежды', category: 'Покупки', amount: 4990, type: 'expense' },
  { id: 7, date: '2026-10-21', title: 'Фитнес-клуб', category: 'Здоровье', amount: 2500, type: 'expense' },
  { id: 8, date: '2026-10-20', title: 'Фриланс-проект', category: 'Дополнительный доход', amount: 15000, type: 'income' },
  { id: 9, date: '2026-10-18', title: 'Магнит', category: 'Продукты', amount: 1840, type: 'expense' },
  { id: 10, date: '2026-10-16', title: 'Метро', category: 'Транспорт', amount: 75, type: 'expense' },
  { id: 11, date: '2026-10-14', title: 'Кино', category: 'Развлечения', amount: 950, type: 'expense' },
  { id: 12, date: '2026-10-12', title: 'Кофейня', category: 'Продукты', amount: 560, type: 'expense' }
]
export const categories = ['Продукты', 'Транспорт', 'Развлечения', 'Здоровье', 'Покупки']
export const categoryColors = {
  'Продукты': '#16bf89', 'Транспорт': '#f5ae2e', 'Развлечения': '#8b5cf6',
  'Здоровье': '#f0445c', 'Покупки': '#e65bb5', 'Другое': '#94a3b8'
}