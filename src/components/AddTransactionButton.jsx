import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { categories } from '../data'

export default function AddTransactionButton({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ type: 'expense', title: '', category: 'Продукты', amount: '', date: '2026-10-29' })
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const submit = e => {
    e.preventDefault()
    if (!form.title.trim() || Number(form.amount) <= 0) return
    onAdd({ ...form, id: Date.now(), amount: Number(form.amount), title: form.title.trim() })
    setForm({ type: 'expense', title: '', category: 'Продукты', amount: '', date: '2026-10-29' })
    setOpen(false)
  }
  return <>
    <button className="add-button" onClick={() => setOpen(true)}><Plus size={19}/> Добавить транзакцию</button>
    {open && <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setOpen(false)}>
      <form className="modal" onSubmit={submit}>
        <div className="modal-head"><div><h2>Новая транзакция</h2><p>Добавьте доход или расход в ваш бюджет</p></div><button type="button" className="icon-button" onClick={() => setOpen(false)}><X/></button></div>
        <div className="type-switch"><button type="button" className={form.type === 'expense' ? 'chosen expense' : ''} onClick={() => update('type', 'expense')}>Расход</button><button type="button" className={form.type === 'income' ? 'chosen income' : ''} onClick={() => update('type', 'income')}>Доход</button></div>
        <label className="form-label">Название<input required value={form.title} onChange={e => update('title', e.target.value)} placeholder="Например, Покупка продуктов"/></label>
        <label className="form-label">Категория<select value={form.category} onChange={e => update('category', e.target.value)}>{(form.type === 'expense' ? categories : ['Зарплата', 'Дополнительный доход', 'Другое']).map(c => <option key={c}>{c}</option>)}</select></label>
        <div className="form-grid"><label className="form-label">Сумма, ₽<input required type="number" min="1" step="1" value={form.amount} onChange={e => update('amount', e.target.value)} placeholder="0"/></label><label className="form-label">Дата<input required type="date" value={form.date} onChange={e => update('date', e.target.value)}/></label></div>
        <button className="submit-button" type="submit">Сохранить транзакцию</button>
      </form>
    </div>}
  </>
}