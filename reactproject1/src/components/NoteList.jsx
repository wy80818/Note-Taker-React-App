import SortFilter from './SortFilter'

function NoteList({ notes, selectedNote, onSelectNote, onDeleteNote, sortBy, onSortChange }) {
  if (notes.length === 0) {
    return (
      <div className="note-list empty">
        <div className="empty-state">
          <p>No notes yet</p>
          <p>Create a new note to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="note-list">
      <SortFilter sortBy={sortBy} onSortChange={onSortChange} />
      {notes.map(note => (
        <div
          key={note.id}
          className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
          onClick={() => onSelectNote(note)}
        >
          <div className="note-item-content">
            <h3 className="note-item-title">{note.title}</h3>
            <p className="note-item-preview">
              {note.content.substring(0, 100) || 'No content'}
            </p>
            <span className="note-item-date">
              {note.updatedAt}
            </span>
          </div>
          <button
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteNote(note.id)
            }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  )
}

export default NoteList
