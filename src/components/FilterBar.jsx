const FILTERS = [
  { value: 'all',       label: '전체' },
  { value: 'active',    label: '진행 중' },
  { value: 'completed', label: '완료' },
]

export default function FilterBar({ filter, onFilterChange, activeCount, completedCount, totalCount, onClearCompleted }) {
  return (
    <div className="filter-bar">
      <div className="filter-stats">
        <span className="stat-num">{activeCount}</span>개 남음
        {totalCount > 0 && (
          <span className="total-info">/ 총 {totalCount}개</span>
        )}
      </div>

      <div className="filter-buttons">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn ${filter === f.value ? 'active' : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          완료 삭제 ({completedCount})
        </button>
      )}
    </div>
  )
}
