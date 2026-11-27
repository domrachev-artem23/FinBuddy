import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { categoryColors } from '../data'

export default function ExpensesChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense')
  const total = expenses.reduce((sum, t) => sum + t.amount, 0)
  const data = Object.entries(expenses.reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc }, {}))
    .map(([name, value]) => ({ name, value, color: categoryColors[name] || categoryColors.Другое }))
    .sort((a, b) => b.value - a.value)
  return <section className="panel chart-panel"><div className="panel-heading"><h3>Расходы по категориям</h3><button className="link-button">Все <span>›</span></button></div>
    {data.length ? <><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="62%" outerRadius="88%" paddingAngle={2} stroke="none">{data.map(d => <Cell key={d.name} fill={d.color}/>)}</Pie><Tooltip formatter={v => `${Number(v).toLocaleString('ru-RU')} ₽`}/></PieChart></ResponsiveContainer><div className="chart-center"><b>{total.toLocaleString('ru-RU')} ₽</b><span>Всего расходов</span></div></div>
    <div className="legend">{data.map(d => <div className="legend-row" key={d.name}><i style={{background:d.color}}/><span>{d.name}</span><b>{Math.round(d.value / total * 100)}%</b><small>{d.value.toLocaleString('ru-RU')} ₽</small></div>)}</div></> : <div className="empty-chart">Пока нет расходов</div>}
  </section>
}