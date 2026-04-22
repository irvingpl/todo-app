import { useState, useEffect, useCallback } from 'react'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import FilterBar from './components/FilterBar'
import './App.css'

const STORAGE_KEY = 'todo-app-v1'

function loadTodos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const EMPTY_MESSAGES = {
  all:       { icon: '📝', text: '할 일이 없습니다. 새로운 할 일을 추가해보세요!' },
  active:    { icon: '🎉', text: '모든 할 일을 완료했습니다!' },
  completed: { icon: '📋', text: '완료된 할 일이 없습니다.' },
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = useCallback((text, priority) => {
    setTodos(prev => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: text.trim(),
        completed: false,
        priority,
        createdAt: Date.now(),
      },
      ...prev,
    ])
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }, [])

  const saveTodo = useCallback((id, text) => {
    if (text.trim()) {
      setTodos(prev => prev.map(t => t.id === id ? { ...t, text: text.trim() } : t))
    }
    setEditingId(null)
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed))
  }, [])

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length
  const emptyMsg = EMPTY_MESSAGES[filter]

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">TODO</h1>
          <p className="subtitle">할 일을 체계적으로 관리하세요</p>
        </header>

        <TodoInput onAdd={addTodo} />

        <div className="todo-card">
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            totalCount={todos.length}
            onClearCompleted={clearCompleted}
          />

          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">{emptyMsg.icon}</span>
              <p>{emptyMsg.text}</p>
            </div>
          ) : (
            <ul className="todo-list">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={editingId === todo.id}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onStartEdit={(id) => setEditingId(id)}
                  onSave={saveTodo}
                  onCancelEdit={() => setEditingId(null)}
                />
              ))}
            </ul>
          )}
        </div>

        {todos.length > 0 && (
          <p className="footer-hint">더블클릭하여 할 일을 수정할 수 있습니다</p>
        )}
      </div>
    </div>
  )
}
