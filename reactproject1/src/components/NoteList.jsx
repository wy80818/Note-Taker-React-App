function NoteList({ notes, onSelectNote, onDeleteNote }) {
  if (notes.length === 0) {
    return (
      <div className="note-list empty">
        <div className="empty-state">
          <p>📭 No notes yet</p>
          <p>Click "+ New Note" to create your first note!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="note-list">
      <div className="sticky-notes-grid">
        {notes.map(note => (
          <div
            key={note.id}
            className="sticky-note"
            onClick={() => onSelectNote(note)}
          >
            <div className="sticky-note-content">
              <h3 className="sticky-note-title">{note.title || 'Untitled'}</h3>
              <p className="sticky-note-preview">
                {note.content || 'Click to edit...'}
              </p>
            </div>
            <div className="sticky-note-footer">
              <span className="sticky-note-date">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
              <button
                className="btn-sticky-delete"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteNote(note.id)
                }}
                title="Delete note"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NoteList
