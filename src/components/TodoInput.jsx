import { useState } from 'react'

const PRIORITIES = [
  { value: 'high',   label: '높음 🔴' },
  { value: 'medium', label: '중간 🟡' },
  { value: 'low',    label: '낮음 🟢' },
]

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, priority)
    setText('')
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          className="todo-input"
          placeholder="새로운 할 일을 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          maxLength={200}
        />
        <button type="submit" className="add-btn" disabled={!text.trim()}>
          + 추가
        </button>
      </div>
      <div className="priority-row">
        <span className="priority-label">우선순위</span>
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            type="button"
            className={`priority-btn ${p.value} ${priority === p.value ? 'active' : ''}`}
            onClick={() => setPriority(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  )
}
