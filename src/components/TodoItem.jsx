import { useState, useRef, useEffect } from 'react'

const PRIORITY_LABELS = { high: '높음', medium: '중간', low: '낮음' }

export default function TodoItem({ todo, isEditing, onToggle, onDelete, onStartEdit, onSave, onCancelEdit }) {
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text)
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing, todo.text])

  const commitEdit = () => onSave(todo.id, editText)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') commitEdit()
    else if (e.key === 'Escape') onCancelEdit()
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className={`priority-bar ${todo.priority}`} />

      <button
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '완료 취소' : '완료 처리'}
      >
        {todo.completed && '✓'}
      </button>

      <div className="todo-content">
        {isEditing ? (
          <input
            ref={inputRef}
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitEdit}
            maxLength={200}
          />
        ) : (
          <span
            className="todo-text"
            onDoubleClick={() => !todo.completed && onStartEdit(todo.id)}
            title={todo.completed ? '' : '더블클릭하여 수정'}
          >
            {todo.text}
          </span>
        )}
        <span className={`priority-badge ${todo.priority}`}>
          {PRIORITY_LABELS[todo.priority]}
        </span>
      </div>

      <div className="todo-actions">
        {!todo.completed && !isEditing && (
          <button
            className="action-btn edit-btn"
            onClick={() => onStartEdit(todo.id)}
            aria-label="수정"
            title="수정"
          >
            ✎
          </button>
        )}
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(todo.id)}
          aria-label="삭제"
          title="삭제"
        >
          ✕
        </button>
      </div>
    </li>
  )
}
