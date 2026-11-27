import React from 'react'
const tabs = ['Все транзакции', 'Продукты', 'Транспорт', 'Развлечения', 'Здоровье', 'Покупки']
export default function CategoryTabs({ active, onChange, transactions }) {
  return <div className="tabs">{tabs.map(tab => {
    const count = tab === 'Все транзакции' ? transactions.length : transactions.filter(t => t.category === tab).length
    return <button key={tab} onClick={() => onChange(tab)} className={`tab ${active === tab ? 'selected' : ''}`}>{tab} <span>{count}</span></button>
  })}</div>
}