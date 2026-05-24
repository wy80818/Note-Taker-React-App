function SortFilter({ sortBy, onSortChange }) {
  return (
    <div className="sort-filter">
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="lastCreated">Last Created</option>
        <option value="lastUpdated">Last Updated</option>
      </select>
    </div>
  )
}

export default SortFilter
