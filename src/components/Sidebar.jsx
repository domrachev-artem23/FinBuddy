import React from 'react'
import { Home, ArrowLeftRight, PieChart, Target, ChartNoAxesCombined, Tags, FileText, Settings, Wallet, LogOut } from 'lucide-react'

const links = [
  ['Главная', Home], ['Транзакции', ArrowLeftRight], ['Бюджет', PieChart],
  ['Цели', Target], ['Аналитика', ChartNoAxesCombined], ['Категории', Tags],
  ['Отчёты', FileText], ['Настройки', Settings]
]

export default function Sidebar({ active, onNavigate }) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><ChartNoAxesCombined size={25}/></div><div><b>FinBuddy</b><span>Ваш личный бюджет</span></div></div>
    <nav>{links.map(([label, Icon]) => <button key={label} onClick={() => onNavigate(label)} className={`nav-link ${active === label ? 'active' : ''}`}><Icon size={19}/><span>{label}</span></button>)}</nav>
    <div className="profile"><div className="avatar">ИП</div><div><b>Иван Петров</b><span>Пользователь</span></div><LogOut size={18} className="logout"/></div>
  </aside>
}