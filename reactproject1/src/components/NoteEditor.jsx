import { useState, useRef, useEffect } from 'react'

function NoteEditor({ note, isEditing, onEdit, onSave, onCancel }) {
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const prevNoteIdRef = useRef(null)

  useEffect(() => {
    if (note?.id !== prevNoteIdRef.current) {
      prevNoteIdRef.current = note?.id
      setEditTitle('')
      setEditContent('')
    }
  }, [note?.id])

  const handleEditClick = () => {
    setEditTitle(note?.title || '')
    setEditContent(note?.content || '')
    onEdit()
  }

  const handleSave = () => {
    onSave({
      title: editTitle || 'Untitled Note',
      content: editContent,
    })
  }

  if (!note) {
    return (
      <div className="note-editor empty">
        <div className="empty-state">
          <p>Select a note to view</p>
        </div>
      </div>
    )
  }

  return (
    <div className="note-editor">
      {isEditing ? (
        <>
          <div className="editor-header">
            <input
              type="text"
              className="editor-title-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Note title..."
            />
            <div className="editor-actions">
              <button onClick={handleSave} className="btn-save">
                ✅ Save
              </button>
              <button onClick={onCancel} className="btn-cancel">
                ❌ Cancel
              </button>
            </div>
          </div>
          <textarea
            className="editor-content-input"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Start typing..."
          />
        </>
      ) : (
        <>
          <div className="editor-header">
            <h2 className="editor-title">{note.title}</h2>
            <button onClick={handleEditClick} className="btn-edit">
              ✏️ Edit
            </button>
          </div>
          <div className="editor-meta">
            <span>Created: {note.createdAt}</span>
            <span>Updated: {note.updatedAt}</span>
          </div>
          <div className="editor-content">
            {note.content || <em>No content</em>}
          </div>
        </>
      )}
    </div>
  )
}

export default NoteEditor
