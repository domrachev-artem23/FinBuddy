import React from 'react'
import { Search, CalendarDays, ChevronDown } from 'lucide-react'

export default function SearchBar({ query, onQueryChange, month, onMonthChange }) {
  return <div className="toolbar-search">
    <label className="search-field"><Search size={19}/><input value={query} onChange={e => onQueryChange(e.target.value)} placeholder="Поиск по транзакциям, категориям, магазинам..."/></label>
    <label className="month-field"><CalendarDays size={17}/><select value={month} onChange={e => onMonthChange(e.target.value)}><option value="2026-10">Октябрь 2026</option><option value="2026-11">Ноябрь 2026</option><option value="all">Все даты</option></select><ChevronDown size={15}/></label>
  </div>
}