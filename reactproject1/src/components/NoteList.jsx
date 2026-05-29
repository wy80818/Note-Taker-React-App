import { useState, useRef } from 'react'

function NoteList({ notes, onSelectNote, onDeleteNote, onReorderNotes }) {
  const [draggedNoteId, setDraggedNoteId] = useState(null)
  const [dragOverId, setDragOverId] = useState(null)
  const dragSourceIndexRef = useRef(null)

  const getNoteSizeClass = (note) => {
    const contentLength = (note.title?.length || 0) + (note.content?.length || 0)
    if (contentLength > 1000) return 'sticky-note--xl'
    if (contentLength > 500) return 'sticky-note--lg'
    if (contentLength > 200) return 'sticky-note--md'
    return 'sticky-note--sm'
  }

  const handleDragStart = (e, noteId, index) => {
    setDraggedNoteId(noteId)
    dragSourceIndexRef.current = index
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML)
  }

  const handleDragOver = (e, noteId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (noteId !== draggedNoteId) {
      setDragOverId(noteId)
    }
  }

  const handleDragLeave = (e) => {
    // Only clear drag over if leaving the element entirely
    if (e.currentTarget === e.target) {
      setDragOverId(null)
    }
  }

  const handleDrop = (e, dropIndex, dropNoteId) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverId(null)

    if (!draggedNoteId || draggedNoteId === dropNoteId) {
      setDraggedNoteId(null)
      dragSourceIndexRef.current = null
      return
    }

    const draggedIndex = dragSourceIndexRef.current
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedNoteId(null)
      dragSourceIndexRef.current = null
      return
    }

    // Reorder notes
    const newNotes = [...notes]
    const [draggedNote] = newNotes.splice(draggedIndex, 1)
    newNotes.splice(dropIndex, 0, draggedNote)

    // Call parent callback to update state
    onReorderNotes(newNotes)
    setDraggedNoteId(null)
    dragSourceIndexRef.current = null
  }

  const handleDragEnd = () => {
    setDraggedNoteId(null)
    setDragOverId(null)
    dragSourceIndexRef.current = null
  }

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
        {notes.map((note, index) => (
          <div
            key={note.id}
            className={`sticky-note ${getNoteSizeClass(note)} ${
              draggedNoteId === note.id ? 'dragging' : ''
            } ${dragOverId === note.id ? 'drag-over' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, note.id, index)}
            onDragOver={(e) => handleDragOver(e, note.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index, note.id)}
            onDragEnd={handleDragEnd}
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
