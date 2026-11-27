import React, { useEffect, useMemo, useState } from 'react'
import { Bell, ChevronDown, MoreVertical, ShoppingBasket, CarFront, Clapperboard, HeartPulse, ShoppingBag, BriefcaseBusiness, CircleDollarSign, Wallet, TrendingUp, TrendingDown, CreditCard, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import CategoryTabs from './components/CategoryTabs'
import AddTransactionButton from './components/AddTransactionButton'
import ExpensesChart from './components/ExpensesChart'
import { initialTransactions, categoryColors } from './data'

const fmt = n => `${n.toLocaleString('ru-RU')} ₽`
const icons = { 'Продукты': ShoppingBasket, 'Транспорт': CarFront, 'Развлечения': Clapperboard, 'Здоровье': HeartPulse, 'Покупки': ShoppingBag, 'Зарплата': BriefcaseBusiness, 'Дополнительный доход': CircleDollarSign }
const dateFmt = s => new Date(`${s}T12:00:00`).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' })

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('finbuddy-transactions')
      return saved ? JSON.parse(saved) : initialTransactions
    } catch {
      return initialTransactions
    }
  })
  const [activeNav, setActiveNav] = useState('Главная')
  const [query, setQuery] = useState('')
  const [month, setMonth] = useState('2026-10')
  const [category, setCategory] = useState('Все транзакции')
  const [sort, setSort] = useState('new')

  // useEffect сохраняет изменения состояния в localStorage после каждого обновления.
  useEffect(() => {
    localStorage.setItem('finbuddy-transactions', JSON.stringify(transactions))
  }, [transactions])
  const income = transactions.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0)
  const filtered = useMemo(() => transactions.filter(t => {
    const q = query.toLowerCase()
    return (!q || [t.title,t.category].some(v => v.toLowerCase().includes(q))) &&
      (month === 'all' || t.date.startsWith(month)) &&
      (category === 'Все транзакции' || t.category === category)
  }).sort((a,b) => sort === 'new' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)), [transactions, query, month, category, sort])
  const budgets = [{name:'Продукты', spent:13800, limit:20000},{name:'Транспорт',spent:7300,limit:10000},{name:'Развлечения',spent:5900,limit:8000},{name:'Здоровье',spent:4900,limit:7000},{name:'Покупки',spent:10800,limit:15000}]
  const add = item => setTransactions(prev => [item, ...prev])
  return <div className="app-shell">
    <Sidebar active={activeNav} onNavigate={setActiveNav}/>
    <main className="main-area">
      <header className="topbar"><SearchBar query={query} onQueryChange={setQuery} month={month} onMonthChange={setMonth}/><div className="top-actions"><AddTransactionButton onAdd={add}/><button className="bell-button" aria-label="Уведомления"><Bell size={20}/><i/></button><div className="top-user"><div className="avatar small">ИП</div><div><b>Иван Петров</b><span>Пользователь</span></div><ChevronDown size={15}/></div></div></header>
      {activeNav !== 'Главная' && <div className="section-notice">Раздел «{activeNav}» выбран. Основная панель FinBuddy остаётся доступной для демонстрации компонентов.</div>}
      <div className="summary-grid">
        <Summary icon={Wallet} color="green" title="Доходы" value={fmt(income)} trend="+12%" sub="по сравнению с прошлым месяцем"/>
        <Summary icon={TrendingDown} color="red" title="Расходы" value={fmt(expenses)} trend="+8%" sub="по сравнению с прошлым месяцем" down/>
        <Summary icon={CreditCard} color="blue" title="Баланс" value={fmt(income-expenses)} trend="+15%" sub="по сравнению с прошлым месяцем"/>
        <Summary icon={PiggyBank} color="purple" title="Накопления" value="120 000 ₽" trend="+10%" sub="цель на этот месяц"/>
      </div>
      <div className="content-grid">
        <section className="panel transactions-panel"><CategoryTabs active={category} onChange={setCategory} transactions={transactions}/><div className="table-heading"><h3>Последние транзакции</h3><span>{filtered.length} операций</span></div>
          <div className="table-scroll"><table><thead><tr><th className="check-col"></th><th>Дата</th><th>Описание</th><th>Категория</th><th>Сумма</th><th>Тип</th><th></th></tr></thead><tbody>
            {filtered.map(t => { const Icon = icons[t.category] || CircleDollarSign; return <tr key={t.id}><td><input type="checkbox" aria-label={`Выбрать ${t.title}`}/></td><td className="date-cell">{dateFmt(t.date)}</td><td><div className="description"><span className="category-icon" style={{color:categoryColors[t.category] || '#64748b',background:`${categoryColors[t.category] || '#64748b'}18`}}><Icon size={15}/></span><b>{t.title}</b></div></td><td><span className="category-name">{t.category}</span></td><td className={`amount ${t.type}`}>{t.type === 'income' ? '+' : '−'} {fmt(t.amount)}</td><td><span className={`type-pill ${t.type}`}>{t.type === 'income' ? 'Доход' : 'Расход'}</span></td><td><button className="more-button" aria-label="Действия"><MoreVertical size={17}/></button></td></tr>})}
          </tbody></table>{filtered.length === 0 && <div className="empty-state">Ничего не найдено. Измените поиск или фильтры.</div>}</div>
        </section>
        <aside className="right-column"><ExpensesChart transactions={transactions}/><section className="panel budget-panel"><div className="panel-heading"><h3>Бюджет на месяц</h3><button className="link-button">Октябрь 2026 <ChevronDown size={13}/></button></div>{budgets.map(b => {const Icon=icons[b.name];return <div className="budget-row" key={b.name}><span className="budget-icon" style={{color:categoryColors[b.name],background:`${categoryColors[b.name]}18`}}><Icon size={17}/></span><div className="budget-info"><div><b>{b.name}</b><small>{fmt(b.spent)} / {fmt(b.limit)}</small></div><div className="progress"><i style={{width:`${Math.min(100,b.spent/b.limit*100)}%`,background:categoryColors[b.name]}}/></div></div><b className="percent">{Math.round(b.spent/b.limit*100)}%</b></div>})}</section></aside>
      </div>
      <footer>FinBuddy <span>•</span> Ваш личный финансовый помощник</footer>
    </main>
  </div>
}
function Summary({icon:Icon,color,title,value,trend,sub,down}) { return <section className="summary-card"><div className={`summary-icon ${color}`}><Icon size={21}/></div><div className="summary-copy"><span>{title}</span><b>{value}</b><small className={down?'negative':''}>{down?<ArrowUpRight size={14}/>:<TrendingUp size={14}/>} {trend}</small><em>{sub}</em></div></section> }